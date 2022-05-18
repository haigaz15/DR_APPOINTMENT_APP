import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Doctor } from 'src/doctor/doctor.entity';
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
         const hospital = this.getHospitalByName(name)
         if(hospital){
             throw new ConflictException('Hospital name already exists ')
         }else{
         const sections = await this.sectionService.getAllSection();
         const hospital = this.hospitalRepository.create({
            name:name,
            location:location,
            sections
        })
        
        await this.hospitalRepository.save(hospital)
        return hospital;
        }
    }

    async getAllHospitals():Promise<Hospital[]>{
        const quary = await this.hospitalRepository.createQueryBuilder("hospital")

        const  hospitals = quary.leftJoinAndSelect("hospital.sections","section").leftJoinAndSelect("hospital.doctors","doctors").getMany();
        return hospitals;
    }

    async getHospitalById(id:string,name:string): Promise<Hospital> {
        const quary = await this.hospitalRepository.createQueryBuilder("hospital")
        const hospital = quary.innerJoinAndSelect("hospital.sections","section", "section.name =:name",{name:name})
        .where("hospital.id = :id",{id:id}).getOne()
        if(!hospital){
            throw new NotFoundException(`Hospital with Id ${id} not found`)
        }
        return hospital
    }

    async getHospitalByName(name:string):Promise<Hospital>{
        const hospital  = await this.hospitalRepository.findOne({name})
        return hospital;
    }

    async getSpecifiedHospital(hospitals_):Promise<Hospital[]>{
        const quary = await this.hospitalRepository.createQueryBuilder("hospital")
        const  hospitals = quary.leftJoinAndSelect("hospital.doctors","doctor").where("hospital.name IN (:...names)",{names:hospitals_}).getMany()
        return hospitals;
    }
    

    async uploadImage(name:string,fileName:string):Promise<Object>{
        const hospital = await this.getHospitalByName(name)
        hospital.imageFile = fileName
        this.hospitalRepository.save(hospital)
        return "successfully added the image of the hospital"
    }
    
    async findImageByHospitalName(name:string):Promise<String>{
        const hospital = await this.getHospitalByName(name)
        return hospital.imageFile
    }

}
