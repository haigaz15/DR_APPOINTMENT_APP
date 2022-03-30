import { Doctor } from "src/doctor/doctor.entity";
import { User } from "src/users/user.entiry";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Status } from "./status";


@Entity()
export class Appointment{
    
    @PrimaryGeneratedColumn('uuid')
    id:string

    @Column({default:Status.BOOK})
    appointmentstatus:string

    @Column({default:null})
    date?:Date

    @ManyToOne(() => Doctor, (doctor) => doctor.appointments)
    doctor: Doctor

    @ManyToOne(() => User, (user) => user.appointments)
    user: User
}