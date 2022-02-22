import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { User } from "src/users/user.entiry";
import { UsersService } from "src/users/users.service";
import { JwtPayload } from "./jwt-payload.interface";


@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy){
    constructor(
        private usersService:UsersService,)
        {
        super({
            secretOrKey:'topSecret',
            jwtFromRequest:ExtractJwt.fromAuthHeaderAsBearerToken(),
        });
    }

    async validate(payload:JwtPayload):Promise<User>{
        const {username} = payload;
        const user:User = await this.usersService.findOne(username);
        if(!user){
            throw new UnauthorizedException();
        }
        return user
    }
        
}