import { ApiProperty } from "@nestjs/swagger"

export class CreateUserDto{
  @ApiProperty()
  name: string
  @ApiProperty()
  dni: number
  @ApiProperty()
  email:string
  @ApiProperty()
  password:string
  @ApiProperty()
  address:string
  @ApiProperty()
  city:string
  @ApiProperty()
  country:string
  @ApiProperty()
  rol:string
  @ApiProperty()
  suffrage:boolean

}