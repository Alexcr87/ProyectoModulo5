import { IsBoolean, IsEmail, IsNotEmpty, IsNumber, IsOptional, IsString, MaxLength, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  
  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  @MaxLength(80)
  @ApiProperty({
    description: 'El nombre del usuario, debe tener como mínimo 3 caracteres y máximo 80 caracteres'
  })
  name: string;

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty({
    description: 'Número de documento del usuario',
  })
  dni: number;

  @IsNotEmpty()
  @IsEmail()
  @ApiProperty({
    description: 'El email del usuario debe ser un email válido',
    example: 'example@gmail.com'
  })
  email: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(8)
  @MaxLength(15)
  @ApiProperty({
    description: 'La contraseña debe tener entre 8 y 15 caracteres',
    example: '12345aS@'
  })
  password: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  @MaxLength(80)
  @ApiProperty({
    description: 'La dirección del usuario',
  })
  address: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(5)
  @MaxLength(20)
  @ApiProperty({
    description: 'La ciudad del usuario',
  })
  city: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(5)
  @MaxLength(20)
  @ApiProperty({
    description: 'El país del usuario',
  })
  country: string;

  @IsOptional()
  @IsBoolean()
  @ApiProperty({
    description: 'Indica si el usuario ha votado o no. Se asigna por defecto a "false".',
    default: false,
  })
  suffrage: boolean;

  // Nuevo campo para roles
  @IsOptional()
  @ApiProperty({
    description: 'Lista opcional de IDs de roles para asignar al usuario',
    example: [1, 2],
  })
  roles?: number[];
}
