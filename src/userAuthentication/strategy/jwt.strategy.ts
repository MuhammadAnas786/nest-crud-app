import { ExtractJwt, Strategy } from "passport-jwt";
import { PassportStrategy } from "@nestjs/passport";
import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { UserService } from "src/user/user.service";
import { Request } from "express";
import TokenPayload from "../interface/tokenPayload.interface";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy){
    constructor(
        private readonly userService:UserService,
        private readonly configService:ConfigService
    ){
        super({
            jwtFromRequest: ExtractJwt.fromExtractors([ 
                (req: Request)=> {
                    // console.log(req.cookies.Authentication)
                    return req?.cookies?.Authentication;
                }
            ]),
            secretOrKey: configService.get('JWT_ACCESS_TOKEN_SECRET')
        })
    }
    
    async validate( payload: TokenPayload ){
        console.log("payload")
        return this.userService.getById(payload.userId);
    }
}