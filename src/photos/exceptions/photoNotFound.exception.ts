import { NotFoundException } from "@nestjs/common";

export default class photoNotFoundException extends NotFoundException{
    constructor(Id:number){
        super(`photo with id ${Id} not found`);
    }
}