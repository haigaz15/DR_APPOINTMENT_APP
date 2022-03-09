import { Module } from '@nestjs/common';
import { DoctorService } from './doctor.service';
import { DoctorController } from './doctor.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Doctor } from './doctor.entity';
import { SectionModule } from 'src/section/section.module';

@Module({
  imports:[SectionModule,TypeOrmModule.forFeature([Doctor])],
  providers: [DoctorService],
  controllers: [DoctorController]
})
export class DoctorModule {}
