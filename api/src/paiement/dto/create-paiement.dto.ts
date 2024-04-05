import { ApiProperty } from "@nestjs/swagger";

export class CreatePaiementDto {
    @ApiProperty()
    type_carte:string

    @ApiProperty()
    code:string

    @ApiProperty()
    patientId:any

    @ApiProperty()
    num_carte:any

    @ApiProperty()
    montant:any
}
