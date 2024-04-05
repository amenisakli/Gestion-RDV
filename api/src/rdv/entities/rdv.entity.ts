import { ApiProperty } from "@nestjs/swagger";
import { Patient } from "src/patient/entities/patient.entity";
import { Service } from "src/service/entities/service.entity";
import { BeforeInsert, BeforeUpdate, Column, Entity, Generated, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity("RDV")
export class Rdv {

    @ApiProperty()
    @PrimaryGeneratedColumn()
    id: number;

    @ApiProperty()
    @Column({ nullable: true })
    date: string;

    @ApiProperty()
    @Column({ default: true })
    status: boolean;

    @ApiProperty()
    @Column({ default: false })
    etat: boolean;

    @ApiProperty()
    @Column({ nullable: true })
    @Generated('increment')
    capacite: number

    @ManyToOne(() => Service, (service) => service.rdv, { cascade: true, eager: true })
    serviceId: Service;

    @ManyToOne(() => Patient, (patient) => patient.rdv, { cascade: true, eager: true })
    patientId: Patient;


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
