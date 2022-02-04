import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './user.model';
import { CreateUserDto } from './dto/create-user.dto';

@Controller('users')
export class UsersController {

    constructor(private usersService:UsersService){}

    @Get()
    getAllUsers():User[]{
       return this.usersService.getAllUsers();
    }

    @Get('/:id')
    getUserById(@Param('id') id:string):User{
        return this.usersService.getUserById(id);
    }
    @Post()
    createUser(@Body() createUserDto:CreateUserDto ):User{
        return this.usersService.createUser(createUserDto);
    }

    @Delete('/:id')
    deleteUser(@Param('id') id:string):User{
        return this.usersService.deleteUser(id);
    }


}
