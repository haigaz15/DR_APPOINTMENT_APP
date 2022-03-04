import { Injectable } from '@nestjs/common';
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
        const section = this.sectionRepository.create({
            name:name,
            
        })
        await this.sectionRepository.save(section);
        return section
    }

    async getAllSection():Promise<Section[]>{
        const query = this.sectionRepository.createQueryBuilder('section');
        const sections = await query.leftJoinAndSelect("section.hospitals","hospital").getMany();
        return sections
    }
}
