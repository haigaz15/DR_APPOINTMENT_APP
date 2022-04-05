import { Module  ,forwardRef } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { UsersModule } from 'src/users/users.module';
import { JwtStrategy } from './jwt.strategy';
import { DoctorModule } from 'src/doctor/doctor.module';
import { AppointmentModule } from 'src/appointment/appointment.module';
import { JwtStrategy1 } from './jwt.strategy1';


@Module({
  imports:[
    forwardRef(() => UsersModule),
    
    PassportModule.register({defaultStrategy:'jwt'}),
    JwtModule.register({
      secret:'topSecret',      
      signOptions: {
        expiresIn: '1d',
      },
    }),
    DoctorModule
    
],
  controllers: [AuthController],
  providers: [AuthService,JwtStrategy,JwtStrategy1],
  exports:[JwtStrategy,JwtStrategy1,PassportModule]
})
export class AuthModule {}
