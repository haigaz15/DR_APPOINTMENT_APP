import { Injectable } from '@nestjs/common';
import { User } from './user.model';
import {v4 as uuid} from 'uuid';
import { CreateUserDto } from './dto/create-user.dto';


@Injectable()
export class UsersService {

    private users:User[] = []

    getAllUsers():User[] {
        return this.users;
    }

    getUserById(id:string):User {
        const find = this.users.filter(user=>user.id === id);
        return find[0];
    }

    createUser(createUserDto:CreateUserDto):User{

        const {firstName,lastName,email,password} = createUserDto;

         const user:User = {
             id:uuid(),
             firstName,
             lastName,
             email,
             password
         }
         this.users.push(user);
         return user;
    }

    deleteUser(id:string):User{
        const deletedUser = this.users.filter(user => user.id === id);
        const filter = this.users.filter(user => user.id !== id);
        this.users = filter
        return deletedUser[0];
    }


}
