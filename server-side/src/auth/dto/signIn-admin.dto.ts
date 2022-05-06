import { IsString } from "class-validator";

export class SignInAdminDto {
    @IsString()
    username:string;
    
    @IsString()
    password:string;
}