import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Admin{
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
    password:string 
    
}