import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Section } from 'src/section/section.entity';
import { SectionService } from 'src/section/section.service';
import { Repository } from 'typeorm';
import { CreateHospitalDto } from './dto/create-hospital.dto';
import { Hospital } from './hospital.entity';

@Injectable()
export class HospitalService {
    constructor(
        @InjectRepository(Hospital)
        private hospitalRepository:Repository<Hospital>,
        private sectionService:SectionService,
        
    ){}

    async addHospital(createHospitalDto:CreateHospitalDto):Promise<Hospital>{
         const {name,location} = createHospitalDto;
         const sections = await this.sectionService.getAllSection();
         const hospital = this.hospitalRepository.create({
            name:name,
            location:location,
            sections
        })
        
        await this.hospitalRepository.save(hospital)
        return hospital;
        
    }

    async getAllHospitals():Promise<Hospital[]>{
        const quary = await this.hospitalRepository.createQueryBuilder("hospital")
        const  hospitals = quary.leftJoinAndSelect("hospital.sections","section").getMany();
        return hospitals;
    }

    
    
    
}
