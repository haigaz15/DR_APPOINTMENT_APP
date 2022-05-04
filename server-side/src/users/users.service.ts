import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './user.entiry';
import { Repository } from 'typeorm';
import * as bycrypt from 'bcrypt';

@Injectable()
export class UsersService {

    constructor(
        @InjectRepository(User)
        private usersRepository:Repository<User>,
    ){}
    

    async getAllUsers():Promise<User[]>{
        const query = this.usersRepository.createQueryBuilder('user')
        const users = await query.getMany();
        return users;
    }

    async findOne(username:string):Promise<User>{
        const user = await this.usersRepository.findOne({username});
        return user;
    }
     
    async createUser(createUserDto:CreateUserDto):Promise<User>{
        const {firstName,lastName,email,username,password} = createUserDto;
        const salt = await bycrypt.genSalt();
        const hashedPassword = await bycrypt.hash(password,salt)

        const user = this.usersRepository.create({
            firstName:firstName,
            lastName:lastName,
            email:email,
            username:username,
            password:hashedPassword
        })
        await this.usersRepository.save(user);
        return user
    }

    async updateUser(id:string,createUserDto:CreateUserDto):Promise<User>{
        const {firstName,lastName,email,password,username} = createUserDto;
        const user = await this.usersRepository.findOne(id);
        user.firstName = firstName
        user.username = username
        user.lastName = lastName
        user.email=email
        user.password = password

        try{
            await this.usersRepository.save(user)
        }catch(error){
            throw new ConflictException('Username already exists ')
        } 

        return user
    }
    
    async getUserById(id:string):Promise<User>{
        const found = await this.usersRepository.findOne(id);
        if(!found){
            throw new NotFoundException(`User with Id ${id} not found`)
        }
        return found 
    }



    async deleteUser(id:string):Promise<String>{
        const result =  await this.usersRepository.delete(id)
        if(result.affected === 0) {
            throw new NotFoundException(`Task with ID ${id} not found`);
        }
        return `User with id ${id} has been deleted`
    }

    async uploadImage(id:string,fileName:string):Promise<Object>{
        const user = await this.getUserById(id)
        user.imageFile = fileName
        this.usersRepository.save(user)
        return {firstName:user.firstName,lastName:user.lastName}
    }

    async findImageByUserId(id:string):Promise<String>{
        const user = await this.getUserById(id)
        delete user.password
        return user.imageFile
    }
}
