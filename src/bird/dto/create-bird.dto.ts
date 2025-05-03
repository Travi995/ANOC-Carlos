import { IsEnum, IsNotEmpty, IsString } from "class-validator"
import { statusHEALTH } from "../entities/bird.entity"

export class CreateBirdDto {

    @IsString()
    @IsNotEmpty()
    ci:string

    @IsString()
    @IsNotEmpty()
    peso:string

    @IsString()
    @IsEnum(statusHEALTH)
    statusSick:statusHEALTH

    @IsString()
    @IsNotEmpty()
    especie:string
}
