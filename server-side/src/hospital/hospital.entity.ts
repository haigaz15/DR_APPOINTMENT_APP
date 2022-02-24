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

    @ManyToMany(()=>Section)
    @JoinTable()
    section:Section[];
}