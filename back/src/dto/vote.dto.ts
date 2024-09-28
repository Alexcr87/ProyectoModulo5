import { IsNotEmpty, IsOptional } from "class-validator";

export class VoteDto {
  @IsNotEmpty()
  userId: string; 

  @IsNotEmpty()
  campaignId: string; 
  
  @IsOptional()
  candidateId?: string; 
}
