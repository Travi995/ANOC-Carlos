import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { RolesEnum } from "../enum/rol.enum";

@Entity('user')
export class UserEntity {

    @PrimaryGeneratedColumn('uuid')
    id:string

    @Column('text',{unique:true,})
    email:string

    @Column('enum',{enum:RolesEnum,default:RolesEnum.USER})
    rol:RolesEnum

    @Column('text', {select:false,})
    password:string
}
