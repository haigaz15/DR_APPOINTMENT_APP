import { Body, Controller, Delete, Get, HttpException, Param, Post, Req, Res, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { JwtAuthGuard2 } from 'src/auth/JwtAuthGaurd2';
import { saveImageToStorage } from 'src/helpers/image-storage';
import { Doctor } from './doctor.entity';
import { DoctorService } from './doctor.service';
import { AddDoctorDto } from './dto/adddoctor.dto';
import { Request } from 'express';


@Controller('doctor')
export class DoctorController {
    constructor(
        private doctorService:DoctorService
    ){}

    @Get()
    getAllDoctors(@Req() req:Request){
        return this.doctorService.getAllDoctors(req)
    }

    @Get('/:hosId')
    async findDoctorByhands(@Param('hosId') hosId:string):Promise<Doctor[]>{
        return this.doctorService.findDoctorByHosBySec(hosId);
    }

    @Post()
    addDoctor(@Body() addDoctorDto:AddDoctorDto):Promise<Doctor>{
        return this.doctorService.addDoctor(addDoctorDto);
    }

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


    @UseGuards(JwtAuthGuard2)
    @Get("image")
    async findImageByUserId(@Req()req, @Res() res):Promise<any>{
        const doctorId = req.user.id
        const image = await this.doctorService.findImageByDoctorId(doctorId)
        return res.sendFile(image,{root:'./images'})
    }

}
