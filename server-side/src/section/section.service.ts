import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Section } from './section.entity';

@Injectable()
export class SectionService {
    constructor(
        @InjectRepository(Section)
        private sectionRepository:Repository<Section>
    ){}
}
