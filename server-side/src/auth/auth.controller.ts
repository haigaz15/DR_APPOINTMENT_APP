import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignInUserDto } from './dto/signIn-user.dto';

@Controller('auth')
export class AuthController {
    constructor(private authService:AuthService){}

    @Post('signin')
    async signIn(@Body() signInUserDto:SignInUserDto):Promise<{accessToken:string}>{
        return this.authService.validateUser(signInUserDto);
    }
}
