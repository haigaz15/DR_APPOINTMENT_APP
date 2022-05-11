import { Body, Controller, Get, HttpException, Param, Post, Req, Res, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { JwtAuthGuard3 } from 'src/auth/JwtAuthGaurd3';
import { saveImageToStorage } from 'src/helpers/image-storage';
import { Section } from 'src/section/section.entity';
import { CreateHospitalDto } from './dto/create-hospital.dto';
import { Hospital } from './hospital.entity';
import { HospitalService } from './hospital.service';

@Controller('hospital')
export class HospitalController {
    constructor(
        private hospitalService:HospitalService
    ){}

    @Get()
    getAllHospitals():Promise<Hospital[]>{
        return this.hospitalService.getAllHospitals()
    }

    @Get('image/:name')
    async findImageByHospitalName(@Param('name') name:string, @Res() res):Promise<any>{
        const image = await this.hospitalService.findImageByHospitalName(name)
        return res.sendFile(image,{root:'./images'})
    }

    @Get('/:id/:name')
    getHospitalById(@Param('id') id:string,@Param('name') name:string ):Promise<Hospital>{
        return this.hospitalService.getHospitalById(id,name)
    }

    @UseGuards(JwtAuthGuard3)
    @Post('imageupload/:name')
    @UseInterceptors(FileInterceptor('file',saveImageToStorage))
    uploadImage(@UploadedFile()file: Express.Multer.File, @Param('name') name:string):any{
        const fileName = file?.filename;
        if(!fileName)  throw new HttpException('type must be either jpg,png or jpeg',500 );
        return this.hospitalService.uploadImage(name,fileName)
    }

    @UseGuards(JwtAuthGuard3)
    @Post()
    addHospital(@Body() createHospitalDto:CreateHospitalDto):Promise<Hospital>{
        return this.hospitalService.addHospital(createHospitalDto)
    }



}
