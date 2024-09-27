import { IsNotEmpty } from "class-validator";

export class VoteDto {
  @IsNotEmpty()
  userId: string; 

  @IsNotEmpty()
  campaignId: string; 
  
  @IsNotEmpty()
  candidateId: string; 
}
