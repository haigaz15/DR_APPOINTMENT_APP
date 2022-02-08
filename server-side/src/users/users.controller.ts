import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './user.entiry';
@Controller('users')
export class UsersController {

    constructor(private usersService:UsersService){}

    @Get()
    getAllUsers():Promise<User[]>{
       return this.usersService.getAllUsers();
    }

    @Get('/:id')
    getTaskById (@Param('id') id:string):Promise<User>{
        return this.usersService.getUserById(id);
    }
     @Post()
    createUser(@Body() createUserDto:CreateUserDto ):Promise<User>{
        return this.usersService.createUser(createUserDto);
    }

    @Delete('/:id')
    deleteUser(@Param('id') id:string):Promise<void>{
        return this.usersService.deleteUser(id);
    }

    @Patch('/:id')
    updateUser(@Param('id') id:string,@Body() createUserDto:CreateUserDto ):Promise<User>{
        return this.usersService.updateUser(id,createUserDto);
    }

}
