import { IsNotEmpty } from 'class-validator';

export class VoteDto {
  @IsNotEmpty()
  userId: string;

  @IsNotEmpty()
  candidateId: string;
}
