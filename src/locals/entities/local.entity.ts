import { AsociateEntity } from "src/asociate/entities/asociate.entity";
import { BirdEntity } from "src/bird/entities/bird.entity";
import { Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('local')
export class LocalEntity {

    @PrimaryGeneratedColumn('uuid')
    id:string

    @Column('text')
    name:string

    @Column('text')
    address:string

    @Column('numeric')
    capacity:number

    @OneToOne(()=>AsociateEntity,asociate=>asociate.local)
    @JoinColumn({name:'asociate_id',referencedColumnName:'id'})
    manager:AsociateEntity

    @OneToMany(()=>BirdEntity,bird=>bird.local)
    bird:BirdEntity[]



}
