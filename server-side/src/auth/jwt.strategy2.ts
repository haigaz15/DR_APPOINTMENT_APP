import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { Admin } from "src/admin/admin.entity";
import { AdminService } from "src/admin/admin.service";

import {  JwtPayload2 } from "./jwt-payload.interface";
import { jwtConstants } from "./jwtConstants";


@Injectable()
export class JwtStrategy2 extends PassportStrategy(Strategy,'strategy_jwt_3'){
    constructor(
        private adminService:AdminService)
        {
        super({
            secretOrKey:jwtConstants.secret,
            jwtFromRequest:ExtractJwt.fromAuthHeaderAsBearerToken(),
        });
    }


    async validate(payload:JwtPayload2):Promise<String>{
        const {id} = payload;
        const admin:Admin = await this.adminService.findById(id);
        if(!admin){
            throw new UnauthorizedException("Your not an Admin thus unauthorized ");
        }
        return admin.firstName
    }
        
}