import { IsEnum, IsNotEmpty, IsString } from "class-validator"
import { statusHEALTH } from "../entities/bird.entity"
import { ApiProperty } from "@nestjs/swagger"

export class CreateBirdDto {

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    ci:string

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    peso:string

    @ApiProperty()
    @IsString()
    @IsEnum(statusHEALTH)
    statusSick:statusHEALTH

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    especie:string
}
