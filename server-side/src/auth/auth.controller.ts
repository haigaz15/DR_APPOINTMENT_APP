import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignInDoctorDto } from './dto/signIn-doctor.dto';
import { SignInUserDto } from './dto/signIn-user.dto';

@Controller('auth')
export class AuthController {
    constructor(private authService:AuthService){}

    @Post('signin')
    async signIn(@Body() signInUserDto:SignInUserDto):Promise<{accessToken:string}>{
        return this.authService.validateUser(signInUserDto);
    }

    @Post('doctor')
    async signInDoctor(@Body() signInDoctorDto:SignInDoctorDto):Promise<{accessToken:string}>{
        return this.authService.validateDoctor(signInDoctorDto)
    }
}
