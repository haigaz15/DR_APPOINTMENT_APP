

import { IsString } from "class-validator";

export class SignInDoctorDto {
    @IsString()
    email:string;
    
    @IsString()
    password:string;
}