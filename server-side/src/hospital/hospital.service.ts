import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Hospital } from './hospital.entity';

@Injectable()
export class HospitalService {
    constructor( 
        @InjectRepository(Hospital)
        private hospital:Repository<Hospital>
    ){}

    
    
}
