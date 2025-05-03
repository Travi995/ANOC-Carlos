import { AsociateEntity } from "src/asociate/entities/asociate.entity";
import { statusEnum } from "src/user/enum/status.enum";
import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

export enum statusHEALTH {
    SICK="SICK",
    HEALTHY="HEALTHY"
}


@Entity('bird')
export class BirdEntity {

    @PrimaryGeneratedColumn('uuid')
    id:String

    @Column('text',{nullable:false,unique:true})
    ci:string

    @Column('text',)
    peso:string

    @Column('enum',{enum:statusHEALTH,nullable:false,default:statusHEALTH.HEALTHY})
    statusSick:statusHEALTH

    @Column('text',{nullable:false})
    especie:string

    @Column('enum',{enum:statusEnum,default:statusEnum.ACTIVE})
    status:statusEnum

    @CreateDateColumn()
    createdAt:Date

    @ManyToOne(()=>AsociateEntity,asociate=>asociate.birds)
    asociate:AsociateEntity
}
