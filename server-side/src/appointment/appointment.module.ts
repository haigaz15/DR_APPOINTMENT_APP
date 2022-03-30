import { Module } from '@nestjs/common';
import { AppointmentService } from './appointment.service';
import { AppointmentController } from './appointment.controller';
import { Appointment } from './appointment.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from 'src/users/users.module';
import { DoctorModule } from 'src/doctor/doctor.module';

@Module({
  imports:[UsersModule,DoctorModule,TypeOrmModule.forFeature([Appointment])],
  providers: [AppointmentService],
  controllers: [AppointmentController]
})
export class AppointmentModule {}
