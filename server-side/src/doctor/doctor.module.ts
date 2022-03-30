import { Module } from '@nestjs/common';
import { DoctorService } from './doctor.service';
import { DoctorController } from './doctor.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Doctor } from './doctor.entity';
import { SectionModule } from 'src/section/section.module';
import { HospitalModule } from 'src/hospital/hospital.module';
import { Appointment } from '../appointment/appointment.entity';

@Module({
  imports:[SectionModule,HospitalModule,TypeOrmModule.forFeature([Doctor])],
  providers: [DoctorService],
  controllers: [DoctorController],
  exports:[DoctorService]
})
export class DoctorModule {}
