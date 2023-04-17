import { Injectable } from '@nestjs/common';
import { Admin } from './admin.entity';
import { CreateAdminDto } from './dto/create-admin.dto';
import * as bycrypt from 'bcrypt';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOneOptions, Repository } from 'typeorm';

@Injectable()
export class AdminService {

    constructor(
        @InjectRepository(Admin)
        private adminRepository:Repository<Admin>,
    ){}

    async createAdmin(createAdminDto:CreateAdminDto):Promise<String>{

        const {firstName,lastName,email,username,password} = createAdminDto;
        const salt = await bycrypt.genSalt();
        const hashedPassword = await bycrypt.hash(password,salt)

        const admin = this.adminRepository.create({
            firstName:firstName,
            lastName:lastName,
            email:email,
            username:username,
            password:hashedPassword
        })

        await this.adminRepository.save(admin);

        return `Admin ${admin.firstName} created sucessfully`;
    }

    async findOne(username:string):Promise<Admin>{
        const admin  = await this.adminRepository.findOne({username} as FindOneOptions)
        return admin;
    }

    async findById(id:string):Promise<Admin>{
        const admin  = await this.adminRepository.findOne({id} as  FindOneOptions)
        return admin;
    }
}
