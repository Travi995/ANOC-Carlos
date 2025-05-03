import { BirdEntity } from "src/bird/entities/bird.entity";
import { UserEntity } from "src/user/entities/user.entity";
import { Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('asociate')
export class AsociateEntity {

    @PrimaryGeneratedColumn('uuid')
    id:string

    @Column('text')
    nombre:string

    @Column('text',{nullable:true})
    apellido:string

    @Column('text',{unique:true})
    identify:string

    @Column('text',{nullable:true})
    direction:string

    @OneToOne(()=>UserEntity,user=>user.asociate,{cascade:true})
    @JoinColumn({name:'user_id',referencedColumnName:'id'})
    user:UserEntity

    @OneToMany(()=>BirdEntity,bird=>bird.asociate)
    birds:BirdEntity[]

}
