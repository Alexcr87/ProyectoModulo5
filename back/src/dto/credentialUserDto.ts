import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsString, Length, Matches } from "class-validator";


export class CredentialUserDto {
    @ApiProperty({
        example: "mailuser@gmail.com"
    })
    @IsNotEmpty({message: "email option should not be empty"})
    @IsEmail()
    email:string

    @ApiProperty({
        example: "1234"
    })
    @IsNotEmpty({message: "password option should not be empty"})
    @IsString()
    password: string
}

export class newChangePassword {
    @ApiProperty({
        example:"actual password user"
    })
    @IsNotEmpty({message: "password option should not be empty"})
    @IsString()
    password:string

    @ApiProperty({
        example: "new password user"
    })
    @Length(8,15, {message: "password property must contain a minimum of 8 to 15 characters"})
    @IsString()
    @IsNotEmpty({message:"password must not be empty"})
    @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,100}$/ , {
      message: "password must contain at least one lowercase letter, one uppercase letter, one number, and one special character (!@#$%^&*)"
  })
    newPassword:string
}