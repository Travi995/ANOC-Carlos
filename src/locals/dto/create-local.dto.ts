import { ApiProperty } from "@nestjs/swagger"
import { Type } from "class-transformer"

export class CreateLocalDto {

    @ApiProperty()
    name:string

    @ApiProperty()
    address:string

    @ApiProperty()
    @Type(()=>Number)
    capacity:number
}
