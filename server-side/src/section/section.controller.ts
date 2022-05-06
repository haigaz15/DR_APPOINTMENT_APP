import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { CreateSectionDto } from './dto/create-section.dto';
import { SectionService } from './section.service';
import { Section } from './section.entity';
import { JwtAuthGuard3 } from 'src/auth/JwtAuthGaurd3';
@Controller('section')
export class SectionController {
    constructor(
        private sectionService:SectionService
    ){}

    @UseGuards(JwtAuthGuard3)
    @Post()
    addSection(@Body() createSectionDto:CreateSectionDto):Promise<Section>{
        return this.sectionService.addSection(createSectionDto);
    }

    @Get()
    getAllSections():Promise<Section[]>{
        return this.sectionService.getAllSection();
    }

    @Get('/:id')
    getSectionById(@Param('id') id:string):Promise<Section>{
        return this.sectionService.getSectionById(id);
    }
    
}
