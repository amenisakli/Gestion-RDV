import { ApiProperty } from "@nestjs/swagger";
import { Paiement } from "src/paiement/entities/paiement.entity";
import { Rdv } from "src/rdv/entities/rdv.entity";
import { BeforeInsert, BeforeUpdate, Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity("Patient")
export class Patient {

    @ApiProperty()
    @PrimaryGeneratedColumn()
    id:number

    @ApiProperty({nullable:true})
    @Column()
    name:string

    @ApiProperty({nullable:true})
    @Column()
    lastname:string

    @ApiProperty()
    @Column({nullable:true})
    tel:string

    @ApiProperty()
    @Column({nullable:true})
    dossier:string

    @ApiProperty()
    @Column({nullable:true})
    numero:string

    @ApiProperty()
    @Column({nullable:true})
    email:string

    @ApiProperty()
    @Column("text", { name: "Matricule", nullable: true, unique: true })
    matricule: string | null;

    @ApiProperty()
    @Column({default:true})
    status:boolean

    @OneToMany(() => Rdv, rdv => rdv.patientId)
    rdv: Rdv[];

    @OneToMany(() => Paiement, paiement => paiement.patientId)
    paiement: Paiement[];
    
    @ApiProperty()
    @Column({ name: "createdby", nullable: true })
    createdBy: string | null;

    @ApiProperty()
    @Column({ name: "updatedby", nullable: true })
    updatedBy: string | null;

    @ApiProperty()
    @Column("timestamp with time zone", { name: "createdat", nullable: true })
    createdAt: Date | null;

    @ApiProperty()
    @Column("timestamp with time zone", { name: "updatedat", nullable: true })
    updatedAt: Date | null;

    @BeforeInsert()
    eventCreatedAt() {
        this.createdAt = new Date();
    }

    @BeforeUpdate()
    eventUpdatedAt() {
        this.updatedAt = new Date();
    }
}
