import {
  IsBoolean,
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Length,
  Matches,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Role } from 'src/entities/roles.entity';

export class CreateUserDtoByAuth0 {
  @ApiProperty({
    example: 'nameuser',
  })
  @IsString()
  @IsNotEmpty({ message: 'name must not be empty' })
  @Length(3, 80, {
    message: 'name property must contain a minimum of 3 to 80 characters',
  })
  name: string;

  @ApiProperty({
    example: '11111111',
  })
  @IsNumber()
  @IsNotEmpty({ message: 'dni must not be empty' })
  dni: number;

  @ApiProperty({
    example: 'usuario@gmail.com',
  })
  @IsEmail()
  @IsNotEmpty({ message: 'email must not be empty' })
  email: string;

  @IsString()
  @IsOptional()
  @Length(3, 80, {
    message: 'address property must contain a minimum of 3 to 80 characters',
  })
  @ApiProperty({
    example: 'Saavedra 4353',
  })
  address: string;

  @IsString()
  @IsOptional()
  password: string;

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
  roles?: Role[];
}
