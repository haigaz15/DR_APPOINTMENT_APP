import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreateSectionDto } from './dto/create-section.dto';
import { SectionService } from './section.service';
import { Section } from './section.entity';
@Controller('section')
export class SectionController {
    constructor(
        private sectionService:SectionService
    ){}

    @Post()
    addSection(@Body() createSectionDto:CreateSectionDto):Promise<Section>{
        return this.sectionService.addSection(createSectionDto);
    }

    @Get()
    getAllSections():Promise<Section[]>{
        return this.sectionService.getAllSection();
    }
    
}