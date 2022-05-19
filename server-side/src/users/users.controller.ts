import { Body, ClassSerializerInterceptor, Controller, Delete, Get, HttpException, Param, Patch, Post, Put, Req, Res, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './user.entiry';
import { JwtAuthGuard1 } from 'src/auth/JwtAuthGaurd1';
import { FileInterceptor } from '@nestjs/platform-express';
import { saveImageToStorage } from 'src/helpers/image-storage';
import { JwtAuthGuard3 } from 'src/auth/JwtAuthGaurd3';



@Controller('users')
export class UsersController {

    constructor(private usersService:UsersService){}

    @UseInterceptors(ClassSerializerInterceptor)
    @Get()
    getAllUsers():Promise<User[]>{
       return this.usersService.getAllUsers();
    }

    @Post()
    createUser(@Body() createUserDto:CreateUserDto ):Promise<String>{
        return this.usersService.createUser(createUserDto);
    }

    @UseGuards(JwtAuthGuard1)
    @Get("image")
    async findImageByUserId(@Req()req, @Res() res):Promise<any>{
        const userId = req.user.id
        const image = await this.usersService.findImageByUserId(userId)
        return res.sendFile(image,{root:'./images'})
    }


    @Get('/:id')
    @UseInterceptors(ClassSerializerInterceptor)
    @UseGuards(JwtAuthGuard1)
    getUserById (@Param('id') id:string):Promise<User>{
        return this.usersService.getUserById(id);
    }


    
    @Delete('/:id')
    @UseGuards(JwtAuthGuard3)
    deleteUser(@Param('id') id:string):Promise<String>{
        return this.usersService.deleteUser(id);
    }

    @UseGuards(JwtAuthGuard1)
    @Patch()
    updateUser(@Req()req, @Res() res,@Body() createUserDto:CreateUserDto ):Promise<String>{
        const userId = req.user.id
        return res.send(this.usersService.updateUser(userId,createUserDto));
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
