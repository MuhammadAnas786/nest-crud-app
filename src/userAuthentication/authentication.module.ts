import { Module } from "@nestjs/common";
import { UsersModule } from "src/user/user.module";
import { PassportModule } from "@nestjs/passport"
import { AuthenticationService } from "./authentication.service";
import { LocalStrategy } from "./strategy/local.strategy";
import AuthenticationController from "./authentication.controller";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { JwtModule } from "@nestjs/jwt";
import { JwtStrategy } from "./strategy/jwt.strategy";

@Module({
    imports:[
        UsersModule,
        PassportModule,
        ConfigModule,
        JwtModule.registerAsync({
            imports:[ConfigModule],
            inject:[ConfigService],
            useFactory:async (configService:ConfigService) => ({
                secret: configService.get('JWT_SECRET'),
                signOptions:{
                    expiresIn : `${configService.get('JWT_EXPIRATION_TIME')*24*60*60*1000}s`
                }
            })
        })
    ],
    providers:[AuthenticationService,LocalStrategy,JwtStrategy],
    controllers:[AuthenticationController]
})
export default class AuthenticationModule{}