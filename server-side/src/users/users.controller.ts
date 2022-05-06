import { Body, Controller, Delete, Get, HttpException, Param, Patch, Post, Req, Res, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './user.entiry';
import { JwtAuthGuard1 } from 'src/auth/JwtAuthGaurd1';
import { FileInterceptor } from '@nestjs/platform-express';
import { saveImageToStorage } from 'src/helpers/image-storage';



@Controller('users')
export class UsersController {

    constructor(private usersService:UsersService){}

    @Get()
    getAllUsers():Promise<User[]>{
       return this.usersService.getAllUsers();
    }

    @UseGuards(JwtAuthGuard1)
    @Get("image")
    async findImageByUserId(@Req()req, @Res() res):Promise<any>{
        const userId = req.user.id
        const image = await this.usersService.findImageByUserId(userId)
        return res.sendFile(image,{root:'./images'})
    }

    @Get('/:id')
    @UseGuards(JwtAuthGuard1)
    getUserById (@Param('id') id:string):Promise<User>{
        return this.usersService.getUserById(id);
    }
    @Post()
    createUser(@Body() createUserDto:CreateUserDto ):Promise<User>{
        return this.usersService.createUser(createUserDto);
    }
    
    @Delete('/:id')
    deleteUser(@Param('id') id:string):Promise<String>{
        return this.usersService.deleteUser(id);
    }

    @Patch('/:id')
    updateUser(@Param('id') id:string,@Body() createUserDto:CreateUserDto ):Promise<User>{
        return this.usersService.updateUser(id,createUserDto);
    }

    @Post('imageupload')
    @UseGuards(JwtAuthGuard1)
    @UseInterceptors(FileInterceptor('file',saveImageToStorage))
    uploadImage(@UploadedFile() file: Express.Multer.File,@Req() req ):any{
        const fileName = file?.filename;
        if(!fileName)  throw new HttpException('type must be either jpg,png or jpeg',500);
        const userId = req.user.id
        return this.usersService.uploadImage(userId,fileName)
    }   
}
