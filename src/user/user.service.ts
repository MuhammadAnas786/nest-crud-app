import { Injectable, HttpStatus,HttpException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import CreateUserDto from "./dto/create.dto";
import User from "./user.entity";

@Injectable()
    export class UserService{
       
        constructor( 
            @InjectRepository(User) 
            private UserRepo:Repository<User> 
            ) {}
    
        async getByEmail( email:string ){
            const user = await this.UserRepo.findOne({
                where:({
                    email:email
                })
            })
            if(user)
            return user
            throw new HttpException("User with this email doesnot exist",HttpStatus.NOT_FOUND);
        }
        async getById( id:number ){
            const user = await this.UserRepo.findOne({
                where:({
                    id:id
                })
            })
            if(user)
            return user
            throw new HttpException("User with this Id doesnot exist",HttpStatus.NOT_FOUND);
        }
        async createUser(user:CreateUserDto){
            console.log("in service")
            const newUser =  this.UserRepo.create(user);
            await this.UserRepo.save(newUser);
            return newUser;
        }
       
    }