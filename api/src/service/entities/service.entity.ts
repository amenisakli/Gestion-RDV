import { ApiProperty } from "@nestjs/swagger";
import { Rdv } from "src/rdv/entities/rdv.entity";
import { User } from "src/user/entities/user.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity("Service")
export class Service {

    @ApiProperty()
    @PrimaryGeneratedColumn()
    id:number;

    @ApiProperty()
    @Column({nullable : true})
    name:string;

    @ApiProperty()
    @Column({nullable : true})
    type:string;

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
   
    @OneToMany(() => User, user => user.serviceId)
    user: any;

}