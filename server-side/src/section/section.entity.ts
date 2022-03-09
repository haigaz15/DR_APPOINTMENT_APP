import { Doctor } from "src/doctor/doctor.entity";
import { Hospital } from "src/hospital/hospital.entity";
import { Column, Entity, JoinTable, ManyToMany, OneToMany, PrimaryGeneratedColumn } from "typeorm";


@Entity()
export class Section{
    @PrimaryGeneratedColumn('uuid')
    id:string;

    @Column()
    name:string

    @ManyToMany(()=> Hospital, hospital=> hospital.sections)
    hospitals:Hospital[];

    @OneToMany(()=>Doctor, doctor=> doctor.section)
    doctors:Doctor[]

}