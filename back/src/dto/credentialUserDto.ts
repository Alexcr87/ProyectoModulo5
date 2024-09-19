import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsString } from "class-validator";


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