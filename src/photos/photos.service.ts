import { HttpException,HttpStatus,Injectable } from "@nestjs/common";
import CreatePhotoDto from "./dto/create.dto";
import UpdatePhotoDto from "./dto/update.dto";
// import { PHOTOS } from "./photos.interface";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import Photo from "./Entities/photos.entity";
import photoNotFoundException from "./exceptions/photoNotFound.exception";


@Injectable()
export default class PhotoService {

    constructor(
        @InjectRepository(Photo)
        private photos: Repository<Photo>
    ) {}

    async getAllPhotos(){
        return this.photos.find();
    }

    async getPhotosById(id: number){
        const photo = await this.photos.findOne({
            where:({
                id:id
            })
        });
        if(photo)
        return photo;
        throw new photoNotFoundException(id);
    }

    async createPhoto(photo:CreatePhotoDto){
        const newPhoto = this.photos.create(photo);
        await this.photos.save(newPhoto);
        return newPhoto;
    }

    async updatePhoto(id:number,photo:UpdatePhotoDto){
        await this.photos.update(id, { ...photo, id:id});
        return this.getPhotosById(id);
    }

    async deletePhoto(id:number) {
        const photo = await this.photos.delete(id);
        if(!photo.affected)
            throw new photoNotFoundException(id);
        }
}