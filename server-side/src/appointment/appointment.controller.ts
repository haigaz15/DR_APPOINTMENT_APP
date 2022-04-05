import { Body, Controller, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { JwtAuthGuard2 } from 'src/auth/JwtAuthGaurd2';


import { Appointment } from './appointment.entity';
import { AppointmentService } from './appointment.service';
import { CreateAppointmentDto } from './dto/createappointment.dto';
import { UpdateAppointmentDto } from './dto/updateappointment.dto';


@Controller('appointment')
export class AppointmentController {
    constructor(
        private appointmentService:AppointmentService
    ){}

    @Get()
    getAllAppointments():Promise<Appointment[]>{
        return this.appointmentService.getAllAppointment()
    }

    @Post()
    createAppointment(@Body() createAppointmentDto:CreateAppointmentDto):Promise<Appointment>{
        return this.appointmentService.createAppointment(createAppointmentDto)
    }

    @UseGuards(JwtAuthGuard2)
    @Patch('/:id')
    updateAppointment(@Param('id') appointmentId:string, @Body() updateAppointmentDto:UpdateAppointmentDto):Promise<Appointment>{
        return this.appointmentService.updateAppointment(appointmentId,updateAppointmentDto)
    }
}


