import { Column,PrimaryGeneratedColumn,Entity } from "typeorm";

@Entity()
class Photo {
    @PrimaryGeneratedColumn()
    public id:number;

    @Column()
    public title:string;

    @Column()
    public content:string;
}

export default Photo;