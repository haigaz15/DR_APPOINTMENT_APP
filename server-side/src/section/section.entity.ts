import { Doctor } from "src/doctor/doctor.entity";
import { Hospital } from "src/hospital/hospital.entity";
import { Column, Entity, JoinTable, ManyToMany, OneToMany, PrimaryGeneratedColumn } from "typeorm";


@Entity()
export class Section{
    @PrimaryGeneratedColumn('uuid')
    id:string;

    @Column()
    name:string

    @ManyToMany(()=> Hospital)
    @JoinTable()
    hospital:Hospital[];

    @OneToMany(() => Doctor,doctor => doctor.section)
    doctor:Doctor[];
}