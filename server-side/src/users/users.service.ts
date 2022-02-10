import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersRepository } from './users.repository';
import { User } from './user.entiry';

@Injectable()
export class UsersService {

    constructor(
        @InjectRepository(UsersRepository)
        private usersRepository:UsersRepository,
    ){}
    
     getAllUsers():Promise<User[]> {
         return this.usersRepository.getAllUsers();
     }

    
    async getUserById(id:string):Promise<User>{
        const found = await this.usersRepository.findOne(id);
        if(!found){
            throw new NotFoundException(`User with Id ${id} not found`)
        }
        return found 
    }


    createUser(createUserDto:CreateUserDto):Promise<User>{
        return this.usersRepository.createUser(createUserDto)
    }


    async deleteUser(id:string):Promise<void>{
        const result =  await this.usersRepository.delete(id)
        if(result.affected === 0) {
            throw new NotFoundException(`Task with ID ${id} not found`);
        }
    }

    updateUser(id:string,createUserDto:CreateUserDto):Promise<User>{
        return this.usersRepository.updateUser(id,createUserDto)
    }
}
