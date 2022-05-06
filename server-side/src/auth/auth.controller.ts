import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignInAdminDto } from './dto/signIn-admin.dto';
import { SignInDoctorDto } from './dto/signIn-doctor.dto';
import { SignInUserDto } from './dto/signIn-user.dto';

@Controller('auth')
export class AuthController {
    constructor(private authService:AuthService){}

    @Post('admin')
    async signInAdmin(@Body() signInAdminDto:SignInAdminDto):Promise<{AdminName:string,accessToken:string}>{
        return this.authService.validateAdmin(signInAdminDto);
    }

    @Post('signin')
    async signIn(@Body() signInUserDto:SignInUserDto):Promise<{userId:String,accessToken:string}>{
        return this.authService.validateUser(signInUserDto);
    }

    @Post('doctor')
    async signInDoctor(@Body() signInDoctorDto:SignInDoctorDto):Promise<{accessToken:string}>{
        return this.authService.validateDoctor(signInDoctorDto)
    }
}
