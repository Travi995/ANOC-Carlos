import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { statusEnum } from "../enum/status.enum";
import { AsociateEntity } from "src/asociate/entities/asociate.entity";
import { ValidRoles } from "src/auth/decorator/roleprotected.decorator";



@Entity('user')
export class UserEntity {

    @PrimaryGeneratedColumn('uuid')
    id:string

    @Column('text',{unique:true,})
    email:string

    @Column('enum',{enum:ValidRoles,default:ValidRoles.USER})
    rol:ValidRoles

    @Column('text', {select:false,})
    password:string

    @Column('enum',{enum:statusEnum,default:statusEnum.ACTIVE})
    status:statusEnum

    @OneToOne(()=>AsociateEntity,asociate=>asociate.user)
    asociate:AsociateEntity

}
