import { EntityRepository, Repository } from "typeorm";
import { CreateUserDto } from "./dto/create-user.dto";
import { User } from "./user.entiry";

@EntityRepository(User)
export class UsersRepository extends Repository<User>{


    async getAllUsers():Promise<User[]>{
        const query = this.createQueryBuilder('user')
        const users = await query.getMany();
        return users;
    }
     

    async createUser(createUserDto:CreateUserDto):Promise<User>{
        const {firstName,lastName,email,password} = createUserDto;

        const user = this.create({
            firstName:firstName,
            lastName:lastName,
            email:email,
            password:password
        })
        await this.save(user);
        return user
    }

    async updateUser(id:string,createUserDto:CreateUserDto):Promise<User>{
        const {firstName,lastName,email,password} = createUserDto;
        const user = await this.findOne(id);
        user.firstName = firstName
        user.lastName = lastName
        user.email=email
        user.password = password

        await this.save(user)

        return user
    }

}
