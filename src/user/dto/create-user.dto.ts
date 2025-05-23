import { ApiProperty } from "@nestjs/swagger"
import { IsEmail, IsString, MinLength } from "class-validator"

export class CreateUserDto {

    @ApiProperty()
    @IsEmail()
    email:string

    @ApiProperty()
    @IsString()
    @MinLength(2)
    password:string

}
