import { Body, Controller, Get, Param, Patch, Post, Req, Res, UseGuards } from '@nestjs/common';
import { JwtAuthGuard2 } from 'src/auth/JwtAuthGaurd2';
import { JwtAuthGuard1 } from 'src/auth/JwtAuthGaurd1';
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

    @UseGuards(JwtAuthGuard1)
    @Get('user')
    async getAppointmentByUserId(@Req()req, @Res() res):Promise<Appointment[]>{
        const userId = req.user.id
        const appointment = await this.appointmentService.getAppointmentByUserId(userId)
        return res.send(appointment)
    }

    @UseGuards(JwtAuthGuard1)
    @Post()
    createAppointment(@Body() createAppointmentDto:CreateAppointmentDto):Promise<Appointment>{
        return this.appointmentService.createAppointment(createAppointmentDto)
    }

    @UseGuards(JwtAuthGuard2)
    @Patch('/:id')
    updateAppointment(@Param('id') appointmentId:string, @Body() updateAppointmentDto:UpdateAppointmentDto,@Req() req):Promise<Appointment>{
        const signedInDoctorID = req.user.id
        return this.appointmentService.updateAppointment(appointmentId,updateAppointmentDto,signedInDoctorID)
    }
}


