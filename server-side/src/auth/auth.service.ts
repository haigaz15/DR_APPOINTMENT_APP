import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import * as bycrypt from 'bcrypt';
import { SignInUserDto } from './dto/signIn-user.dto';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './jwt-payload.interface';

@Injectable()
export class AuthService {
    constructor(
        private usersService:UsersService,
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
}
