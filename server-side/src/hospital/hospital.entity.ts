import { Doctor } from "src/doctor/doctor.entity";
import { Section } from "src/section/section.entity";
import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Hospital{
    @PrimaryGeneratedColumn('uuid')
    id:string;
    
    @Column()
    name:string;

    @Column()
    location:string;

    @Column({nullable:true})
    imageFile:string

    @ManyToMany(()=>Section, section => section.hospitals)
    @JoinTable()
    sections:Section[];

    @ManyToMany(()=>Doctor, doctor=> doctor.hospitals)
    @JoinTable()
    doctors:Doctor[];
}