import { Exclude } from "class-transformer";
import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
class User {
    @PrimaryGeneratedColumn()
    public id: number;

    @Column()
    public name:string;

    @Column({ unique:true })
    public email:string;

    @Column()
    public password:string;

    @Column({
        nullable:true
    })
    @Exclude()
    public currentHashedRefreshToken?:string;
}

export default User