import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { RolesEnum } from "../enum/rol.enum";
import { statusEnum } from "../enum/status.enum";
import { AsociateEntity } from "src/asociate/entities/asociate.entity";



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

    @Column('enum',{enum:statusEnum,default:statusEnum.ACTIVE})
    status:statusEnum

    @OneToOne(()=>AsociateEntity,asociate=>asociate.user)
    asociate:AsociateEntity

}
