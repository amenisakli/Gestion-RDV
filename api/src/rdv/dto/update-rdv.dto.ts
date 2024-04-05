import { ApiProperty } from "@nestjs/swagger"


export class UpdateRdvDto {

    @ApiProperty()
    date:string
    
    @ApiProperty()
    service:any

    @ApiProperty()
    status:boolean

    @ApiProperty()
    rdv:any

    @ApiProperty()
    etat:boolean
}