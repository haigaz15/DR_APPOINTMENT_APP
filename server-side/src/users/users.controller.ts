import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './user.entiry';
import { JwtAuthGuard1 } from 'src/auth/JwtAuthGaurd1';



@Controller('users')
export class UsersController {

    constructor(private usersService:UsersService){}

    @Get()
    getAllUsers():Promise<User[]>{
       return this.usersService.getAllUsers();
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

}
