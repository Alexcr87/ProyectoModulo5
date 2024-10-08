import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsString,
  MinLength,
  MaxLength,
  IsArray,
} from 'class-validator';
import { User } from '../entities/user.entity';
import { Campaign } from 'src/entities/campaign.entity';

export class CreateCandidateDto {
  @IsString()
  @MinLength(3)
  @MaxLength(20)
  @IsNotEmpty()
  @ApiProperty({
    description: 'Nombre de la postulación',
    example: 'Presidente',
  })
  postulation: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'Lista a la que pertenece el candidato',
    example: 'Lista 123',
  })
  list: string;

  @IsArray()
  @ApiProperty({
    description: 'Propuestas del candidato',
    example: ['Crear nuevas plazas de empleo'],
  })
  proposals: string[];

  @IsNotEmpty()
  @ApiProperty({
    type: () => User,
    description: 'ID del usuario creador',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  userId: string;

  @IsNotEmpty()
  @ApiProperty({ type: () => Campaign, description: 'ID de la campaña' })
  campaignId: string;
}
