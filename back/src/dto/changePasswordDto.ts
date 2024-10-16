import { IsString, IsNotEmpty, IsEmail } from 'class-validator';

export class ChangePasswordDto {

    @IsEmail()
    email: string;

    @IsString()
    @IsNotEmpty()
    newPassword: string;

    @IsString()
    @IsNotEmpty()
    confirmPassword: string;
}