import { IsDate, IsString } from "class-validator";
import { Status } from "../status";

export class CreateAppointmentDto{
    @IsString()
    userId:string;

    @IsString() 
    doctorId:string;

    @IsString() 
    appointmentstatus:Status.PENDING

    @IsString()
    date:Date;
}