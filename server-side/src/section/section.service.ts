import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateSectionDto } from './dto/create-section.dto';
import { Section } from './section.entity';


@Injectable()
export class SectionService {
    constructor(
        @InjectRepository(Section)
        private sectionRepository:Repository<Section>
    ){}

    async addSection(createSectionDto:CreateSectionDto):Promise<Section>{

        const {name} = createSectionDto
        const section = this.getSection(name)
        if(section){
            throw new ConflictException('Section already exists ')
        }else{
        const section = this.sectionRepository.create({
            name:name,
            
        })
        await this.sectionRepository.save(section);
        return section
       }
    }

    async getAllSection():Promise<Section[]>{
        const query = this.sectionRepository.createQueryBuilder('section');
        const sections = await query.leftJoinAndSelect("section.hospitals","hospital").leftJoinAndSelect("section.doctors","doctor").getMany();
        return sections
    }

    async getSectionById(id:string):Promise<Section>{
        const query = this.sectionRepository.createQueryBuilder('section');
        const section = await query.leftJoinAndSelect("section.doctors","doctor").where("section.id = :id",{id:id}).getOne()
        if(!section){
            throw new NotFoundException(`Section with Id ${id} not found`)
        }
        return section
    }

    async getSection(name:string):Promise<Section>{
        const section  = await this.sectionRepository.findOne({name})
        return section;
    }

    
}
