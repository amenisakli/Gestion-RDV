import { ApiProperty } from "@nestjs/swagger";

export class CreatePatientDto {
    @ApiProperty()
    name:string

    @ApiProperty()
    lastname:string

    @ApiProperty()
    tel:string

    @ApiProperty()
    dossier:string

    @ApiProperty()
     numero: string;
}
