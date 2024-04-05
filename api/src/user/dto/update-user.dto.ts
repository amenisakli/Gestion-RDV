import { ApiProperty } from "@nestjs/swagger"

export class UpdateUserDto  {

    @ApiProperty()
    name:string

    @ApiProperty()
    lastname:string


    @ApiProperty()
    tel:string

    @ApiProperty()
    email:string

    @ApiProperty()
    password:string

    @ApiProperty()
    roleId:number
}
