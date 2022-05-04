import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Doctor } from './doctor.entity';
import { AddDoctorDto } from './dto/adddoctor.dto';
import * as bycrypt from 'bcrypt';
import { SectionService } from 'src/section/section.service';
import { Section } from 'src/section/section.entity';
import { Hospital } from 'src/hospital/hospital.entity';
import { HospitalService } from 'src/hospital/hospital.service';
import { Request } from 'express';

@Injectable()
export class DoctorService {
    async findImageByDoctorId(id: string) {
        const doctor = await this.getDoctorById(id)
        delete doctor.password
        return doctor.imageFile
    }
    async uploadImage(id: string, fileName: string): Promise<String> {
        const doctor = await this.getDoctorById(id)
        doctor.imageFile = fileName
        this.doctorRepository.save(doctor)
        return "doctor image has been sucessfully added !"
    }
    constructor(
        @InjectRepository(Doctor)
        private doctorRepository:Repository<Doctor>,
        private sectionService:SectionService,
        private hospitalService:HospitalService
    ){}
    
     async getAllDoctors(req:Request){
         const query = this.doctorRepository.createQueryBuilder('doctor');
         const doctors = await query
         .leftJoinAndSelect("doctor.section","section")
         .leftJoinAndSelect("doctor.hospitals","hospitals")

         const page:number = parseInt(req.query.page as any) || 1;
         const perPage = 3;
         const total = await doctors.getCount();

         doctors.offset((page - 1)*perPage).limit(perPage);

         return {
             data: await doctors.getMany(),
             total,
             page,
             perPage,
             last_page:Math.ceil(total/perPage)
            };
     }

     async findDoctorByHosBySec(hosId:string,secId):Promise<Doctor[]>{
        const query = this.doctorRepository.createQueryBuilder('doctor');
        const doctor = await query
        .innerJoinAndSelect("doctor.hospitals","hospital","hospital.id =:hosid",{hosid:hosId})
        .innerJoinAndSelect("doctor.section","section","section.id =:secid",{secid:secId}).getMany()
        return doctor;
    }

     async getDoctorById(id:string):Promise<Doctor>{
         const doctor = await this.doctorRepository.findOne(id);
         if(!doctor){
            throw new NotFoundException(`Doctor with Id ${id} not found`)
        }
        return doctor
     }

     async getDoctorByEmail(email:string):Promise<Doctor>{
         const doctor = await this.doctorRepository.findOne({email})
         return doctor
     }
     
     async addDoctor(addDoctorDto:AddDoctorDto):Promise<Doctor>{
        const {
            firstname,lastname,email,password,
            specialty,countryOfSpecialty,
            university,bio,section,hospitals} = addDoctorDto;
        const salt = await bycrypt.genSalt();
        const hashedPassword = await bycrypt.hash(password,salt)
        const section_:Section = await this.sectionService.getSection(section);
        const hospitals_:Hospital[]= await this.hospitalService.getSpecifiedHospital(hospitals)

        const doctor = this.doctorRepository.create({
            firstname,
            lastname,
            email,
            password:hashedPassword,
            specialty,
            countryOfSpecialty,
            university,
            bio,
            section:section_,
            hospitals:hospitals_
            })

        await this.doctorRepository.save(doctor)
        return doctor
    }

    async deleteDoctor(id:string):Promise<String>{
        const result = await this.doctorRepository.delete(id)
        if(result.affected===0){
            throw new NotFoundException(`Doctor with Id ${id} not found`);
        }
        return `Doctor with id ${id} has been deleted `
    }
}
