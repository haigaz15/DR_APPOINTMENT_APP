import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DoctorService } from 'src/doctor/doctor.service';
import { UsersService } from 'src/users/users.service';
import { Repository } from 'typeorm';
import { Appointment } from './appointment.entity';
import { CreateAppointmentDto } from './dto/createappointment.dto';
import { UpdateAppointmentDto } from './dto/updateappointment.dto';



@Injectable()
export class AppointmentService {

    constructor(
        @InjectRepository(Appointment)
        private appointmentRepository:Repository<Appointment>,
        private userService:UsersService,
        private doctorService:DoctorService
    ){}

    async getAppointmentByUserId(userId:string): Promise<Appointment[]> {
        const query = this.appointmentRepository.createQueryBuilder('appiontment')
        const appiontments = await query.leftJoinAndSelect("appiontment.user","user").leftJoinAndSelect("appiontment.doctor","doctor").where('appiontment.user = :id', { id: userId }).getMany();
        return appiontments;
    }

    async getAllAppointment():Promise<Appointment[]>{
        const query = this.appointmentRepository.createQueryBuilder('appiontment')
        const appiontments = await query.leftJoinAndSelect("appiontment.doctor","doctor").getMany();
        return appiontments;
    }
    
    async createAppointment(createAppointmentDto:CreateAppointmentDto):Promise<Appointment>{
        const { userId,doctorId,appointmentstatus,date} = createAppointmentDto;
        const doctor = await this.doctorService.getDoctorById(doctorId)
        const user = await this.userService.getUserById(userId)
        const appointment = this.appointmentRepository.create({
            appointmentstatus,
            date,
            doctor,
            user 
        })
        return await this.appointmentRepository.save(appointment)
    }

    async updateAppointment(appointmentId:string,updateAppointmentDto:UpdateAppointmentDto,signedInDoctorID):Promise<Appointment>{
        const {appointmentstatus} = updateAppointmentDto
        const query = this.appointmentRepository.createQueryBuilder("appointment");
        const appointment = await query.leftJoinAndSelect("appointment.doctor","doctor")
        .where("appointment.id =:id",{id:appointmentId}).getOneOrFail()
        if(signedInDoctorID === appointment.doctor.id){
            appointment.appointmentstatus= appointmentstatus
            return await this.appointmentRepository.save(appointment)
        }
        throw new UnauthorizedException("You are not authorized Doctor")

    }

}
