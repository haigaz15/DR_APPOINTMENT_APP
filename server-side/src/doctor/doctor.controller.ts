import { Body, Controller, Post } from '@nestjs/common';
import { Doctor } from './doctor.entity';
import { DoctorService } from './doctor.service';
import { AddDoctorDto } from './dto/adddoctor.dto';

@Controller('doctor')
export class DoctorController {
    constructor(
        private doctorService:DoctorService
    ){}

    @Post()
    addDoctor(@Body() addDoctorDto:AddDoctorDto):Promise<Doctor>{
        return this.doctorService.addDoctor(addDoctorDto);
    }
}
