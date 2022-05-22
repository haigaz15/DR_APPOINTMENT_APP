import { ConflictException, Injectable, UnauthorizedException } from '@nestjs/common';
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
        const appiontments = await query.leftJoinAndSelect("appiontment.doctor","doctor").where('appiontment.user = :id', { id: userId }).orderBy("date","DESC").getMany();
        return appiontments;
    }

    async getAllAppointment():Promise<Appointment[]>{
        const query = this.appointmentRepository.createQueryBuilder('appiontment')
        const appiontments = await query.leftJoin("appiontment.doctor","doctor").getMany();
        return appiontments;
    }

    async findAppointment(userId:string,doctorId:string,appointmentstatus:string,date:Date):Promise<Appointment>{
        const query = this.appointmentRepository.createQueryBuilder('appiontment')
        const appointment = await query.leftJoin("appiontment.doctor","doctor")
        .where('appiontment.doctor = :id', { id: doctorId })
        .leftJoin("appiontment.user","user")
        .where('appiontment.user = :id', { id: userId })
        .andWhere('appiontment.appointmentstatus = :appointmentstatus', { appointmentstatus: appointmentstatus })
        .andWhere('appiontment.date = :date', { date: date })
        .getOne()
        return appointment
    }
    
    async createAppointment(createAppointmentDto:CreateAppointmentDto):Promise<String>{
        const { userId,doctorId,appointmentstatus,date} = createAppointmentDto;
        console.log(await this.findAppointment(userId,doctorId,appointmentstatus,date))
        if(await this.findAppointment(userId,doctorId,appointmentstatus,date)){
            throw new ConflictException()
        }else{
        const doctor = await this.doctorService.getDoctorById(doctorId)
        const user = await this.userService.getUserById(userId)
        const appointment = this.appointmentRepository.create({
            appointmentstatus,
            date,
            doctor,
            user 
        })
        await this.appointmentRepository.save(appointment)
        return `appointment is created `
        }
    }

    async updateAppointment(appointmentId:string,updateAppointmentDto:UpdateAppointmentDto,signedInDoctorID):Promise<String>{
        const {appointmentstatus} = updateAppointmentDto
        const query = this.appointmentRepository.createQueryBuilder("appointment");
        const appointment = await query.leftJoinAndSelect("appointment.doctor","doctor")
        .where("appointment.id =:id",{id:appointmentId}).getOneOrFail()
        if(signedInDoctorID === appointment.doctor.id){
            appointment.appointmentstatus= appointmentstatus
            await this.appointmentRepository.save(appointment)
            return `appointment is updated`
        }
        throw new UnauthorizedException("You are not authorized Doctor")

    }

}
