import { IsString, IsNotEmpty, IsDate, IsUUID } from 'class-validator';

export class CreateCampaignDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsString()
  @IsNotEmpty()
  location: string;

  @IsDate()
  @IsNotEmpty()
  date: Date;

  @IsUUID()
  @IsNotEmpty()
  userId: string;  // El ID del usuario que crea la campaña
}
