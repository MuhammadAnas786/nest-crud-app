import { Module } from "@nestjs/common";
import PhotosController from "./photos.controller";
import PhotoService from "./photos.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import Photo from "./Entities/photos.entity";

@Module({
    imports:[
        TypeOrmModule.forFeature([Photo])
    ],
    controllers:[PhotosController],
    providers:[PhotoService]
})

export class PhotosModule{}