import {
  IsEmail,
  IsNumber,
  IsOptional,
  IsString,
  Length,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class updateUserDto {
  @ApiProperty({
    example: 'nameuser',
  })
  @IsString()
  @IsOptional()
  name: string;

  @ApiProperty({
    example: '11111111',
  })
  @IsNumber()
  @IsOptional()
  dni: number;

  @ApiProperty({
    example: 'usuario@gmail.com',
  })
  @IsEmail()
  @IsOptional()
  email: string;

  @IsString()
  @IsOptional()
  @ApiProperty({
    example: 'Saavedra 4353',
  })
  address: string;

  @IsString()
  @IsOptional()
  @Length(5, 50, {
    message: 'city property must contain a minimum of 5 to 50 characters',
  })
  @ApiProperty({
    example: 'Cap. Fed.',
  })
  city: string;

  @IsString()
  @IsOptional()
  @Length(5, 50, {
    message: 'country property must contain a minimum of 5 to 50 characters',
  })
  @ApiProperty({
    example: 'Argentina',
  })
  country: string;

  @IsOptional()
  @ApiProperty({
    description: 'Optional list of role IDs to assign to the user',
    example: [1, 2],
  })
  roles?: number[];
}
