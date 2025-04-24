import { PartialType } from '@nestjs/swagger';
import { CreateUserDto } from './create-user.dto';
import { RolesEnum } from '../enum/rol.enum';
import { IsEnum, IsNotEmpty } from 'class-validator';

export class UpdateUserDto extends PartialType(CreateUserDto) {}


export class UpdateRolDto {
    
    @IsNotEmpty()
    @IsEnum(  RolesEnum)
    rol:RolesEnum
}