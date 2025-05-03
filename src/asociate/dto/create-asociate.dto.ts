import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsOptional, Length,  } from "class-validator";
import { CreateUserDto } from "src/user/dto/create-user.dto";

export class CreateAsociateDto extends CreateUserDto{

    @ApiProperty()
    @IsNotEmpty()
    nombre:string

    @ApiProperty()
    @IsNotEmpty()
    apellido:string
    
    @ApiProperty()
    @IsNotEmpty()
    @Length(11,11)
    identify:string

    @ApiProperty()
    @IsOptional()
    direction?:string


}
