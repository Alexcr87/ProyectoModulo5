import {
    IsString,
    IsNotEmpty,
    IsUUID,
    IsOptional,
    IsArray,
  } from 'class-validator';
  import { ApiProperty } from '@nestjs/swagger';
  
  export class CreateGroupDto {
    @ApiProperty({
      description: 'The name of the group',
      example: 'Environmental Advocates',
    })
    @IsString()
    @IsNotEmpty()
    name: string;
  
    @ApiProperty({
      description: 'A brief description of the group',
      example: 'A group focused on promoting environmental awareness.',
    })
    @IsString()
    @IsNotEmpty()
    description: string;
  
    @IsOptional()
    @IsArray()
    @ApiProperty({
      description: 'List of user IDs that belong to the group',
      example: ['550e8400-e29b-41d4-a716-446655440000'],
    })
    userIds?: string[]; // Opcional: IDs de usuarios que pertenecen al grupo
  }
  