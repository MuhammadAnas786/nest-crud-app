import { IsNotEmpty, IsString } from "class-validator";

export default class CreatePhotoDto {
    @IsString()
    @IsNotEmpty()
    title:string;
    
    @IsString()
    @IsNotEmpty()
    content:string;
}