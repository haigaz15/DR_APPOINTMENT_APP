import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Doctor } from './doctor.entity';
import { AddDoctorDto } from './dto/adddoctor.dto';
import * as bycrypt from 'bcrypt';
import { SectionService } from 'src/section/section.service';
import { Section } from 'src/section/section.entity';

@Injectable()
export class DoctorService {
    constructor(
        @InjectRepository(Doctor)
        private doctorRepository:Repository<Doctor>,
        private sectionService:SectionService
    ){}

     async addDoctor(addDoctorDto:AddDoctorDto):Promise<Doctor>{
        const {
            firstname,lastname,email,password,
            specialty,countryOfSpecialty,
            university,bio,section} = addDoctorDto;
        const salt = await bycrypt.genSalt();
        const hashedPassword = await bycrypt.hash(password,salt)
        const section_:Section = await this.sectionService.getSection(section);

        const doctor = this.doctorRepository.create({
            firstname,
            lastname,
            email,
            password:hashedPassword,
            specialty,
            countryOfSpecialty,
            university,
            bio,
            section:section_
            })

        await this.doctorRepository.save(doctor)
        return doctor
    }
}
