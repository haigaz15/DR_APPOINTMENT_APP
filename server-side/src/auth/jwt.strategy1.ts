import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { Doctor } from "src/doctor/doctor.entity";
import { DoctorService } from "src/doctor/doctor.service";
import { JwtPayload1 } from "./jwt-payload.interface";
import { jwtConstants } from "./jwtConstants";


@Injectable()
export class JwtStrategy1 extends PassportStrategy(Strategy,'strategy_jwt_2'){
    constructor(
        private doctorService:DoctorService)
        {
        super({
            secretOrKey: jwtConstants.secret,
            jwtFromRequest:ExtractJwt.fromAuthHeaderAsBearerToken(),
        });
    }


    async validate(payload:JwtPayload1):Promise<Doctor>{
        const {email} = payload;
        const doctor:Doctor = await this.doctorService.getDoctorByEmail(email);
        if(!doctor){
            throw new UnauthorizedException("Your not a doctor thus unauthorized ");
        }
        return doctor
    }
        
}