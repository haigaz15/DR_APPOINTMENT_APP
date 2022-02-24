import { Controller } from '@nestjs/common';
import { HospitalService } from './hospital.service';

@Controller('hospital')
export class HospitalController {
    constructor(
        private hospitalService:HospitalService
    ){}
}
