import { Controller } from '@nestjs/common';
import { SectionService } from './section.service';

@Controller('section')
export class SectionController {
    constructor(
        private sectionService:SectionService
    ){}
}
