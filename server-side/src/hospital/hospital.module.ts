import { Module } from '@nestjs/common';
import { HospitalService } from './hospital.service';
import { HospitalController } from './hospital.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Hospital } from './hospital.entity';
import { SectionModule } from 'src/section/section.module';
import { DoctorModule } from 'src/doctor/doctor.module';


@Module({
  imports: [SectionModule,TypeOrmModule.forFeature([Hospital])],
  providers: [HospitalService],
  controllers: [HospitalController],
  exports:[HospitalService]
})
export class HospitalModule {}
