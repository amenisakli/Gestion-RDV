import { ApiProperty } from "@nestjs/swagger";
export class CreateRdvDto {

    @ApiProperty()
    date:string
    
    @ApiProperty()
    serviceId:any

    @ApiProperty()
    patientId:any


}
