import { Get, UseGuards, HttpCode ,Post,Controller, Body, Req, Res } from "@nestjs/common";
import CreateUserDto from "src/user/dto/create.dto";
import { AuthenticationService } from "./authentication.service";
import { LocalStrategy } from "./strategy/local.strategy";
import LocalAuthentiationGuard from "./guards/localAuthentication.guard";
import RequestWithUser from "./interface/requestWithUser.interface";
import { Response } from "express";
import JwtAuthGuard from "./guards/jwtAuthentication.guard";
import JwtRefreshGuard from "./guards/jwtRefresh.guard";
import { UserService } from "src/user/user.service";

@Controller('authentication')
export default class AuthenticationController {
    constructor( 
      private readonly authenticationService:AuthenticationService,
      private readonly userService:UserService
       ){}

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
        const accessToken = this.authenticationService.getCookieWithJwtAccessToken(user.id);
        const refreshToken = this.authenticationService.getCookieWithJwtRefreshToken(user.id);

        res.cookie('Refresh',refreshToken.token,refreshToken.cookieOptions);
        res.cookie('Authentication',accessToken.token,accessToken.cookieOptions);
        await this.userService.setCurrentRefresToken(refreshToken.token,user.id);
        console.log(accessToken)
        user.password = undefined;
        return res.send(user);
    }

  @UseGuards(JwtAuthGuard)
  @Post('log-out')
  async logOut(@Req() request: RequestWithUser, @Res() response: Response) {
    response.cookie('Authenticaiton', null,{});
    response.cookie('Refresh', null,{});
    return response.sendStatus(200);
  }

  @UseGuards(JwtRefreshGuard)
  @Get('refresh')
  refresh(@Req() request: RequestWithUser) {
    const accessToken = this.authenticationService.getCookieWithJwtAccessToken(request.user.id);
 
    request.res.cookie('Authentication',accessToken.token,accessToken.cookieOptions);
    return request.user;
  }

} 