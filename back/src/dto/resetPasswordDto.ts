import { IsEmail, MinLength } from 'class-validator';

export class ResetPasswordDto {
  @IsEmail()
  email: string;

  @MinLength(8)
  newPassword: string;

  @MinLength(8)
  confirmPassword: string;
}