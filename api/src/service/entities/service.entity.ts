import { ApiProperty } from "@nestjs/swagger";
import { Rdv } from "src/rdv/entities/rdv.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity("Service")
export class Service {

    @ApiProperty()
    @PrimaryGeneratedColumn()
    id:number;

    @ApiProperty({nullable : true})
    @Column()
    name:string;

    @ApiProperty()
    @Column({ nullable: true })
    desc: string; 

    @ApiProperty()
    @Column({nullable : true})
    pic:string;

    @OneToMany(() => Rdv, rdv => rdv.serviceId)
    rdv: Rdv[];
    
    @ApiProperty()
    @Column({default:true})
    status:boolean;
    // @ApiProperty()
    // @OneToMany(type => Rdv, rdv => rdv.serviceId)
    // rdv: Rdv[];

}
// Rdv.entity.ts
// import { Entity, PrimaryGeneratedColumn, ManyToOne, OneToMany } from 'typeorm';
// import { Service } from './Service.entity';

// @Entity()
// export class Rdv {
//   @PrimaryGeneratedColumn()
//   id: number;



  // Other properties...

// }

// Service.entity.ts
// import { Entity, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
// import { Rdv } from './Rdv.entity';

// @Entity()
// export class Service {
//   @PrimaryGeneratedColumn()
//   id: number;



  // Other properties...
// }
