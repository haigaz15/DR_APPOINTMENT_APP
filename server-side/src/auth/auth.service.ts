import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import * as bycrypt from 'bcrypt';
import { SignInUserDto } from './dto/signIn-user.dto';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload, JwtPayload1 } from './jwt-payload.interface';
import { SignInDoctorDto } from './dto/signIn-doctor.dto';
import { DoctorService } from 'src/doctor/doctor.service';

@Injectable()
export class AuthService {
    constructor(
        
        private usersService:UsersService,
        private doctorService:DoctorService,
        private jwtService:JwtService,
        ){}

    async validateUser(signInUserDto:SignInUserDto):Promise<{accessToken:string}>{
        const {username,password} = signInUserDto;
        const user = await this.usersService.findOne(username)
        if(user && (await bycrypt.compare(password,user.password))){
            const payload:JwtPayload = {username};
            const accessToken = await this.jwtService.sign(payload);
            return {accessToken}
        }else{
            throw new UnauthorizedException('Please check your login credentials');
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
            throw new UnauthorizedException('Unauthorized Doctor !')
        }
    }
}
