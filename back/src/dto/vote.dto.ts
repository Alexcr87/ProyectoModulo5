import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsOptional } from "class-validator";

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
  @IsNotEmpty()
  campaignId: string; 
  
  @ApiProperty({
    description: 'The UUID of the candidate (optional)',
    example: '770e8400-e29b-41d4-a716-446655440002',
    required: false,
  })
  @IsOptional()
  candidateId?: string; 
}