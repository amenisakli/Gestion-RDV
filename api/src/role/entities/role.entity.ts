import { ApiProperty } from "@nestjs/swagger";
import { User } from "src/user/entities/user.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Role {
    @ApiProperty()
    @PrimaryGeneratedColumn()
    id:number 

    @ApiProperty()
    @Column("text", { name: "name", nullable: true })
    name:string

    @ApiProperty()
    @Column({default : true})
    status:boolean

    @OneToMany(() => User, user => user.roleId)
    user: any;
}
