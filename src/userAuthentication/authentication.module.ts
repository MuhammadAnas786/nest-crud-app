import { Module } from "@nestjs/common";
import { UsersModule } from "src/user/user.module";
import { PassportModule } from "@nestjs/passport"
import { AuthenticationService } from "./authentication.service";
import { LocalStrategy } from "./strategy/local.strategy";
import AuthenticationController from "./authentication.controller";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { JwtModule } from "@nestjs/jwt";
import { JwtStrategy } from "./strategy/jwt.strategy";
import JwtRefreshTokenStrategy from "./strategy/refresh.strategy";

@Module({
    imports:[
        UsersModule,
        PassportModule,
        ConfigModule,
        JwtModule.register({})
    ],
    providers:[AuthenticationService,LocalStrategy,JwtStrategy,JwtRefreshTokenStrategy],
    controllers:[AuthenticationController]
})
export default class AuthenticationModule{}