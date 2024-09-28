import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsDate, IsUUID } from 'class-validator';

export class CreateCampaignDto {
  @ApiProperty({
    description: 'The name of the campaign',
    example: 'Save the Planet Campaign',
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    description: 'A brief description of the campaign',
    example: 'A campaign focused on raising awareness about environmental issues.',
  })
  @IsString()
  @IsNotEmpty()
  description: string;

  @ApiProperty({
    description: 'The location where the campaign will take place',
    example: 'Central Park, New York',
  })
  @IsString()
  @IsNotEmpty()
  location: string;

  @ApiProperty({
    description: 'The date when the campaign will be held',
    example: '2024-09-15T00:00:00.000Z',
  })
  @IsDate()
  @IsNotEmpty()
  date: Date;

  @ApiProperty({
    description: 'The UUID of the user creating the campaign',
    example: '550e8400-e29b-41d4-a716-446655440000',
  })
  @IsUUID()
  @IsNotEmpty()
  userId: string;  
}
