import { IsDate, IsString } from "class-validator";
import { Status } from "../status";

export class UpdateAppointmentDto{
    
    @IsString() 
    appointmentstatus:Status.BOOKED

}