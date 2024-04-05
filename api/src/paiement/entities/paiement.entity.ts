import { ApiProperty } from "@nestjs/swagger"
import { Patient } from "src/patient/entities/patient.entity"
import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne } from "typeorm"

@Entity("Paiement")
export class Paiement {

    @ApiProperty()
    @PrimaryGeneratedColumn()
    id:number

    @ApiProperty()
    @Column({nullable:true})
    type_carte:string

    @ApiProperty()
    @Column({nullable:true})
    num_carte:string

    @ApiProperty()
    @Column({nullable:true})
    montant:string

    @ApiProperty()
    @Column({nullable:true})
    code:string

    @ApiProperty({nullable:true})
    @Column("text", { name: "Matricule", nullable: true, unique: true })
    matricule: string | null;


    @ManyToOne(() => Patient, (patient) => patient.paiement, { cascade: true, eager: true })
    patientId: Patient;
}
