import CreateUserDto from "src/user/dto/create.dto";
import { UserService } from "src/user/user.service";
import * as bcrypt from "bcrypt"
import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { ConfigService } from "@nestjs/config";
import TokenPayload from "./interface/tokenPayload.interface";

@Injectable()
export class AuthenticationService{
    constructor(
        private readonly user:UserService,
        private readonly jwtService:JwtService,
        private readonly configService:ConfigService
    ){}

    public async register(newUser:CreateUserDto){
     
        const hashedPassword = await bcrypt.hash(newUser.password,12);
        console.log(this.user)
        try{
            let addUser = await this.user.createUser({
                email:newUser.email,
                name:newUser.name,
                password:hashedPassword
            });
            console.log("Here")
            addUser.password = undefined;
            return addUser;
        }
        catch(err){
            if(err.code === '23505')
            throw new HttpException("Email already exists", HttpStatus.BAD_REQUEST)
            console.log(err)
            throw new HttpException('Something went wrong', HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }
    public async getAuthenticatedUser(email:string,plainText:string){
       try{
        const userAuth = await this.user.getByEmail(email);
        await this.verifyPassword(plainText,userAuth.password);
        userAuth.password = undefined;
        return userAuth;
       }
       catch(err){
        throw new HttpException("Wrong credentials provided", HttpStatus.BAD_REQUEST)
       }
        
    }

    public async verifyPassword(plainText:string,hashedPassword:string){
        const isPasswordMatching = await bcrypt.compare(
            plainText,
            hashedPassword
            );
        if(!isPasswordMatching)
        throw new HttpException("Wrong Credentials provided",HttpStatus.BAD_REQUEST);

    }

    public getCookieWithJwtToken(id:number){
            const payload: TokenPayload = { userId:id };
            const token = this.jwtService.sign(payload);
           
            const cookie = {
                Authentication:token,
                cookieOptions:{
                    maxAge:this.configService.get('JWT_EXPIRATION_TIME')*24*60*60*1000,
                }
            }
            return cookie
             
            // Expires=${new Date(Date.now()+this.configService.get('JWT_EXPIRATION_TIME'))};`
    }
    
    public getCookieWithJwtAccessToken(id:number){
        const payload: TokenPayload = { userId:id };
        const token = this.jwtService.sign(payload,{
            secret:this.configService.get('JWT_ACCESS_TOKEN_SECRET'),
            expiresIn:`${this.configService.get('JWT_ACCESS_TOKEN_EXPIRY')*24*60*60*1000}s`
        });
       
        const cookie = {
            token:token,
            cookieOptions:{
                maxAge:this.configService.get('JWT_ACCESS_TOKEN_EXPIRY')*24*60*60*1000,
               
            }
        }
        return cookie
         
        // Expires=${new Date(Date.now()+this.configService.get('JWT_EXPIRATION_TIME'))};`
}

    public getCookieWithJwtRefreshToken(id:number){
    const payload: TokenPayload = { userId:id };
    const token = this.jwtService.sign(payload,{
        secret:this.configService.get('JWT_REFRESH_TOKEN_SECRET'),
        expiresIn:`${this.configService.get('JWT_REFRESH_TOKEN_EXPIRY')*24*60*60*1000}s`
    });
   
    const cookie = {
        token:token,
        cookieOptions:{
            maxAge:this.configService.get('JWT_REFRESH_TOKEN_EXPIRY')*24*60*60*1000,
            path:'/authentication/refresh/'
        }
    }

    return cookie
}

    public getCookieForLogOut() {
        return `Authentication=; HttpOnly; Path=/; Max-Age=0`;
      }
}