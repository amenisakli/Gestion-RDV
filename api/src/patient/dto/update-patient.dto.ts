import { ApiProperty } from "@nestjs/swagger"


export class UpdatePatientDto {
    @ApiProperty()
    name:string

    @ApiProperty()
    lastname:string

    @ApiProperty()
    tel:string

    @ApiProperty()
    dossier:string

    @ApiProperty()
    email:string
    
    @ApiProperty()
    status:boolean

}
