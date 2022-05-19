import { Exclude } from "class-transformer";
import { Appointment } from "src/appointment/appointment.entity";
import { Column, Entity,  ManyToMany,  OneToMany,  PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User {
    @PrimaryGeneratedColumn('uuid')
    id:string;

    @Column()
    firstName:string;

    @Column()
    lastName:string;

    @Column()
    email:string;

    @Column({ unique: true })
    username:string

    @Column()
    @Exclude()
    password:string 

    @Column({nullable:true})
    imageFile:string

    @OneToMany(() => Appointment, appointment => appointment.user)
    appointments?: Appointment[];

}