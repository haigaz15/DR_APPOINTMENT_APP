import { IsNotEmpty,IsString, Matches, MaxLength, MinLength } from "class-validator";

export class CreateUserDto{

    @IsNotEmpty()
    firstName:string;

    @IsNotEmpty()
    lastName:string;

    @IsNotEmpty()
    email:string;

    @IsNotEmpty()
    @IsString()
    @MinLength(4)
    @MaxLength(20)
    username:string;
    
    @IsNotEmpty()
    @IsString()
    @MinLength(8)
    @MaxLength(20)
    @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
        message:'password is too weak'
    })
    password:string;

}