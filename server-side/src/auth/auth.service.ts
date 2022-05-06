import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import * as bycrypt from 'bcrypt';
import { SignInUserDto } from './dto/signIn-user.dto';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload, JwtPayload1, JwtPayload2 } from './jwt-payload.interface';
import { SignInDoctorDto } from './dto/signIn-doctor.dto';
import { DoctorService } from 'src/doctor/doctor.service';
import { AdminService } from 'src/admin/admin.service';
import { SignInAdminDto } from './dto/signIn-admin.dto';

@Injectable()
export class AuthService {
    constructor(
        
        private usersService:UsersService,
        private doctorService:DoctorService,
        private adminService:AdminService,
        private jwtService:JwtService,
        ){}
    
    async validateAdmin(signInAdminDto:SignInAdminDto):Promise<{AdminName:string,accessToken:string}>{
        const {username,password} = signInAdminDto;
        const admin = await this.adminService.findOne(username)
        const AdminName = admin.firstName
        if(admin && (await bycrypt.compare(password,admin.password))){
            const payload:JwtPayload2 = {id:admin.id};
            const accessToken = await this.jwtService.sign(payload)
            return {AdminName,accessToken}
        }else{
            throw new UnauthorizedException('Dear admin please check your login credentials')
        }
    }
    async validateUser(signInUserDto:SignInUserDto):Promise<{userId:String,accessToken:string}>{
        const {username,password} = signInUserDto;
        const user = await this.usersService.findOne(username)
        const userId = user.id
        if(user && (await bycrypt.compare(password,user.password))){
            const payload:JwtPayload = {username};
            const accessToken = await this.jwtService.sign(payload);
            return {userId,accessToken}
        }else{
            throw new UnauthorizedException('Dear User Please check your login credentials');
        }
    }

    async validateDoctor(signInDoctorDto:SignInDoctorDto):Promise<{accessToken:string}>{
        const {email,password} = signInDoctorDto;
        const doctor = this.doctorService.getDoctorByEmail(email)
        if(doctor && (await bycrypt.compare(password,(await doctor).password))){
            const payload:JwtPayload1 = {email};
            const accessToken = await this.jwtService.sign(payload);
            return {accessToken}
        }else{
            throw new UnauthorizedException('Dear Doctor Please check your login credentials')
        }
    }
}
