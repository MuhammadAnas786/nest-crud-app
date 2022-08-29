import { IsNotEmpty,MinLength ,IsNotEmptyObject, IsEmail,IsOptional, IsNumber, IsString, isNotEmpty, isNotEmptyObject } from "class-validator";
export default class CreateUserDto {
    @IsEmail()
    email:string;

    @IsString()
    @IsNotEmpty()
    name:string;

    @IsString()
    @IsNotEmpty()
    @MinLength(7)
    password:string;
}