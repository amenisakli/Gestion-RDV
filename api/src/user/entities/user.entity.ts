import { ApiProperty } from "@nestjs/swagger";
import { Role } from "src/role/entities/role.entity";
import { BeforeInsert, BeforeUpdate, Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User {
    @ApiProperty()
    @PrimaryGeneratedColumn()
    id: number;

    @ApiProperty()
    @Column("text", { name: "name", nullable: true })
    name: string | null;

    @ApiProperty()
    @Column("text", { name: "password", nullable: true })
    password: string | null;

    @ApiProperty()
    @Column("text", { name: "lastname", nullable: true })
    lastname: string | null;

    @ApiProperty()
    @Column("text", { name: "email", nullable: true, unique: true })
    email: string | null;

    @ApiProperty()
    @Column("boolean", { name: "status", nullable: true, default: true })
    status: boolean;

    @ApiProperty()
    @Column({ name: "matricule", nullable: true })
    matricule: string | null;

    @ApiProperty()
    @Column({ name: "tel", nullable: true, unique: true })
    tel: string | null;

    @ManyToOne(() => Role, (role) => role.user, { cascade: true, eager: true })
    roleId: any;
}

