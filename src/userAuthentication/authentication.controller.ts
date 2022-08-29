import { Get, UseGuards, HttpCode ,Post,Controller, Body, Req, Res } from "@nestjs/common";
import CreateUserDto from "src/user/dto/create.dto";
import { AuthenticationService } from "./authentication.service";
import { LocalStrategy } from "./strategy/local.strategy";
import LocalAuthentiationGuard from "./guards/localAuthentication.guard";
import RequestWithUser from "./interface/requestWithUser.interface";
import { Response } from "express";
import JwtAuthGuard from "./guards/jwtAuthentication.guard";

@Controller('authentication')
export default class AuthenticationController {
    constructor(private readonly authenticationService:AuthenticationService){}

    @Post('/register')
    async register( @Body() userData:CreateUserDto ){
        console.log("init")
        return this.authenticationService.register(userData);
    }
    
    @HttpCode(200)
    @UseGuards(LocalAuthentiationGuard)
    @Post('login')
    async login( @Req() req:RequestWithUser, @Res() res:Response ){
        const user = req.user;
        let cookie = await this.authenticationService.getCookieWithJwtToken(user.id);
        // console.log(res.header('Set-Cookie'));
        res.cookie('Authentication', cookie.Authentication,cookie.cookieOptions);
        user.password = undefined;
        return res.send(user);
    }

  @UseGuards(JwtAuthGuard)
  @Post('log-out')
  async logOut(@Req() request: RequestWithUser, @Res() response: Response) {
    response.cookie('Authenticaiton', null,{});
    return response.sendStatus(200);
  }

} 