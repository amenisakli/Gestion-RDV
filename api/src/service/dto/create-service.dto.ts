import { ApiProperty } from "@nestjs/swagger";

export class CreateServiceDto {

    @ApiProperty()
    name:string
    
    @ApiProperty()
    pic:string

    @ApiProperty()
    desc:string

    @ApiProperty()
    type:string


}