import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { Doctor } from './doctor.entity';
import { DoctorService } from './doctor.service';
import { AddDoctorDto } from './dto/adddoctor.dto';

@Controller('doctor')
export class DoctorController {
    constructor(
        private doctorService:DoctorService
    ){}

    @Get()
    getAllDoctors():Promise<Doctor[]>{
        return this.doctorService.getAllDoctors()
    }
    @Post()
    addDoctor(@Body() addDoctorDto:AddDoctorDto):Promise<Doctor>{
        return this.doctorService.addDoctor(addDoctorDto);
    }
    @Delete('/:id')
    deleteDoctor(@Param('id') id:string):Promise<String>{
        return this.doctorService.deleteDoctor(id);
    }
}
