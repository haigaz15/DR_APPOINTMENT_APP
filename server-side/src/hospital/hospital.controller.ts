import { Body, Controller, Get, Post } from '@nestjs/common';
import { Section } from 'src/section/section.entity';
import { CreateHospitalDto } from './dto/create-hospital.dto';
import { Hospital } from './hospital.entity';
import { HospitalService } from './hospital.service';

@Controller('hospital')
export class HospitalController {
    constructor(
        private hospitalService:HospitalService
    ){}

    @Get()
    getAllHospitals():Promise<Hospital[]>{
        return this.hospitalService.getAllHospitals()
    }

    @Post()
    addHospital(@Body() createHospitalDto:CreateHospitalDto):Promise<Hospital>{
        return this.hospitalService.addHospital(createHospitalDto)
    }
}
