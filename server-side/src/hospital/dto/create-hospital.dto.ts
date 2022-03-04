import { IsNotEmpty } from "class-validator";
import { Section } from "src/section/section.entity";

export class CreateHospitalDto{
    @IsNotEmpty()
    name:string;

    @IsNotEmpty()
    location:string;


}