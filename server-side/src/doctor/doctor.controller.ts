import { Controller } from '@nestjs/common';
import { DoctorService } from './doctor.service';

@Controller('doctor')
export class DoctorController {
    constructor(
        private doctorService:DoctorService
    ){}
}
