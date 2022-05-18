import { Body, Controller, Delete, Get, HttpException, Param, Post, Req, Res, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { JwtAuthGuard2 } from 'src/auth/JwtAuthGaurd2';
import { saveImageToStorage } from 'src/helpers/image-storage';
import { Doctor } from './doctor.entity';
import { DoctorService } from './doctor.service';
import { AddDoctorDto } from './dto/adddoctor.dto';
import { Request } from 'express';
import { JwtAuthGuard3 } from 'src/auth/JwtAuthGaurd3';


@Controller('doctor')
export class DoctorController {
    constructor(
        private doctorService:DoctorService
    ){}

    @Get()
    getAllDoctors(@Req() req:Request){
        return this.doctorService.getAllDoctors(req)
    }

    @Get("image/:id")
    async findImageByUserId(@Param("id") doctorId:string, @Res() res):Promise<any>{
        const image = await this.doctorService.findImageByDoctorId(doctorId)
        return res.sendFile(image,{root:'./images'})
    }

    @Get('/:hosId/:secId')
    async findDoctorByhands(@Param('hosId') hosId:string, @Param('secId') secId:string):Promise<Doctor[]>{
        return this.doctorService.findDoctorByHosBySec(hosId,secId);
    }

    @UseGuards(JwtAuthGuard3)
    @Post()
    addDoctor(@Body() addDoctorDto:AddDoctorDto):Promise<Doctor>{
        return this.doctorService.addDoctor(addDoctorDto);
    }

    @UseGuards(JwtAuthGuard3)
    @Delete('/:id')
    deleteDoctor(@Param('id') id:string):Promise<String>{
        return this.doctorService.deleteDoctor(id);
    }



    @Post('imageupload')
    @UseGuards(JwtAuthGuard2)
    @UseInterceptors(FileInterceptor('file',saveImageToStorage))
    uploadImage(@UploadedFile() file: Express.Multer.File,@Req() req ):any{
        console.log(req)
        const fileName = file?.filename;
        if(!fileName)  throw new HttpException('type must be either jpg,png or jpeg',500 );
        const doctorId = req.user.id
        return this.doctorService.uploadImage(doctorId,fileName)
    }




}
