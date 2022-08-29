import { Body,Get,Post,Put,Delete,Controller, Param, UseGuards } from "@nestjs/common";
import PhotoService from "./photos.service";
import CreatePhotoDto from "./dto/create.dto";
import UpdatePhotoDto from "./dto/update.dto";
import FindOneParams from "src/utils/findOneParams";
import JwtAuthGuard from "src/userAuthentication/guards/jwtAuthentication.guard";

@Controller('photos')
export default class PhotosController{

    constructor( private readonly photosServices:PhotoService ){}

    @UseGuards(JwtAuthGuard)
    @Get()
    getAllPhotos(){
        return this.photosServices.getAllPhotos();
    }

    @UseGuards(JwtAuthGuard)
    @Get(':id')
    getPhotoById( @Param() { id }:FindOneParams ){
        return this.photosServices.getPhotosById( Number(id) );
    }

    @UseGuards(JwtAuthGuard)
    @Post()
    async createPhoto( @Body() photo:CreatePhotoDto ){
        console.log(photo)
        return this.photosServices.createPhoto( photo );
    }

    @UseGuards(JwtAuthGuard)
    @Put(':id')
    async updatePhoto(@Param() { id }:FindOneParams ,@Body() photo:UpdatePhotoDto ){
        return this.photosServices.updatePhoto( Number(id), photo );
    }

    @UseGuards(JwtAuthGuard)
    @Delete(':id')
    deletePhoto( @Param() { id }:FindOneParams ){
        this.photosServices.deletePhoto( Number(id) )
    }
}