import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional } from 'class-validator';

export class VoteDto {
  @ApiProperty({
    description: 'The UUID of the user casting the vote',
    example: '550e8400-e29b-41d4-a716-446655440000',
  })
  @IsNotEmpty()
  userId: string;

  @ApiProperty({
    description: 'The UUID of the campaign being voted on',
    example: '660e8400-e29b-41d4-a716-446655440001',
  })
  @IsNotEmpty() // Cambiado a IsOptional
  campaignId: string; // Permite que campaignId sea opcional

  @ApiProperty({
    description: 'The UUID of the candidate (mandatory)',
    example: '770e8400-e29b-41d4-a716-446655430002',
  })
  @IsOptional() // Mantén este campo como obligatorio
  candidateId?: string; // Cambiado a obligatorio
}
