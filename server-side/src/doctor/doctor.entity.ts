import { Hospital } from "src/hospital/hospital.entity";
import { Section } from "src/section/section.entity";
import { User } from "src/users/user.entiry";
import { Column, Entity, JoinTable, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Appointment } from "../appointment/appointment.entity";

@Entity()
export class Doctor{
    
    @PrimaryGeneratedColumn('uuid')
    id:string;

    @Column()
    firstname:string

    @Column()
    lastname:string

    @Column()
    email:string

    @Column()
    password:string

    @Column()
    specialty:string

    @Column()
    countryOfSpecialty:string

    @Column()
    university:string

    @Column()
    bio:string

    @ManyToOne(()=> Section, section => section.doctors)
    section:Section;

    @ManyToMany(() => Hospital, hospital=> hospital.doctors)
    hospitals:Hospital[]

    @OneToMany(() => Appointment, appointment => appointment.doctor)
    appointments?: Appointment[];

}