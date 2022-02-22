import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports:[
    UsersModule,
    PassportModule.register({defaultStrategy:'jwt'}),
    JwtModule.register({
      secret:'topSecret',      
      signOptions: {
        expiresIn: 86400,
      },
    }),
    
],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
