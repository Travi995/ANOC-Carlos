import { PartialType } from '@nestjs/swagger';
import { CreateUserDto } from './create-user.dto';
import { IsEnum, IsNotEmpty } from 'class-validator';
import { ValidRoles } from 'src/auth/decorator/roleprotected.decorator';

export class UpdateUserDto extends PartialType(CreateUserDto) {}


export class UpdateRolDto {
    
    @IsNotEmpty()
    @IsEnum(  ValidRoles)
    rol:ValidRoles
}