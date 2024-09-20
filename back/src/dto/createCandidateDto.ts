import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsString, MinLength, MaxLength, IsArray } from "class-validator";
import { User } from "../entities/user.entity";  

export class CreateCandidateDto {

  @IsString()
  @MinLength(3)
  @MaxLength(20)
  @IsNotEmpty()
  @ApiProperty()
  postulation: string;

  // @IsString()
  // @IsNotEmpty()
  // @ApiProperty()
  // imgUrl: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  list: string;

  @IsString()
  campaignDescription: string;

  @IsArray()
  proposals: string[];

  @IsNotEmpty()
  @ApiProperty({ type: () => User })
  userId: string; 
}
