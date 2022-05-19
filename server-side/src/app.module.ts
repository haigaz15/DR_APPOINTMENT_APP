import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { HospitalModule } from './hospital/hospital.module';
import { SectionModule } from './section/section.module';
import { DoctorModule } from './doctor/doctor.module';
import { AppointmentModule } from './appointment/appointment.module';
import { AdminModule } from './admin/admin.module';
import { ConfigModule } from '@nestjs/config';



@Module({

  imports: [UsersModule,
    AuthModule,
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: process.env.DATABASE_USERNAME,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_USER,
      autoLoadEntities:true,
      //synchronize: true
    }),
    HospitalModule,
    SectionModule,
    DoctorModule,
    AppointmentModule,
    AdminModule,
],

  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
