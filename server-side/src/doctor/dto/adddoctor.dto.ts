import { IsNotEmpty, IsString, Matches, MaxLength, MinLength } from "class-validator";
import { Section } from "src/section/section.entity";


export class AddDoctorDto {
    @IsString()
    firstname:string;

    @IsString()
    lastname:string;

    @IsNotEmpty()
    email;
    
    @IsNotEmpty()
    @IsString()
    @MinLength(8)
    @MaxLength(20)
    @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
        message:'password is too weak'
    })
    password:string;

    @IsNotEmpty()
    specialty:string

    @IsNotEmpty()
    countryOfSpecialty:string

    @IsNotEmpty()
    university:string

    @IsNotEmpty()
    bio:string

     @IsNotEmpty()
     section:string
}