import { ApiProperty } from "@nestjs/swagger";

export class CreateUserDto {

    @ApiProperty()
    name:string

    @ApiProperty()
    lastname:string


    @ApiProperty()
    tel:string

    @ApiProperty()
    email:string

    @ApiProperty()
    roleId:number

    @ApiProperty()
    password:string

}
