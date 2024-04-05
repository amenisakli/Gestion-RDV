import { ApiProperty } from "@nestjs/swagger";

export class UpdatePaiementDto  {
    @ApiProperty()
    type_carte:string 
     
    @ApiProperty()
    code:string

    @ApiProperty()
    montant:any

    @ApiProperty()
    patientId:any

    @ApiProperty()
    num_carte:any
}
