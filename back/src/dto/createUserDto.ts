
import { ApiProperty, OmitType } from "@nestjs/swagger"
import { IsEmail, isNotEmpty, IsNotEmpty, IsNumber, IsString, isString, Length, Matches } from "class-validator"
import { User } from "src/entities/user.entity"


export class CreateUserDto{
  @ApiProperty({
    example:"nameuser"
  })
  @IsString()
  @IsNotEmpty({message:"name must not be empty"})
  @Length(3,80 , {message: "name property must contain a minimum of 3 to 80 characters"})
  name: string

  @ApiProperty({
    example:"11111111"
  })
  @IsNumber()
  @IsNotEmpty({message:"dni must not be empty"})
  dni: number

  @ApiProperty({
    example:"usuario@gmail.com"
  })
  @IsEmail()
  @IsNotEmpty({message:"email must not be empty"})
  email:string


  @ApiProperty({
    example:"12345"
  })
  @Length(8,15, {message: "password property must contain a minimum of 8 to 15 characters"})
  @IsString()
  @IsNotEmpty({message:"password must not be empty"})
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,100}$/ , {
    message: "password must contain at least one lowercase letter, one uppercase letter, one number, and one special character (!@#$%^&*)"
})
  password:string

  @IsString()
  @IsNotEmpty({message:"address must not be empty"})
  @Length(3,80, {message: "address property must contain a minimum of 3 to 80 characters"})
  @ApiProperty({
    example: "Saavedra 4353"
})
  address:string


 @IsString()
 @IsNotEmpty({message:"city must not be empty"})
 @Length(5,50, {message:"city property must contain a minimum of 5 to 50 characters"})
 @ApiProperty({
    example: "Cap. Fed."
})
  city:string

@IsString()
@IsNotEmpty({message:"country must not be empty"})
@Length(5,50, {message:"country property must contain a minimum of 5 to 50 characters"})
@ApiProperty({
    example: "Argentina"
})
  country:string

}

