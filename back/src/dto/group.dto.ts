import { IsArray, IsNotEmpty, IsOptional, IsString, IsUUID } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateGroupDto {
  @ApiProperty({
    description: 'The name of the group',
    example: 'Group A',
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    description: 'Create user',
    example: ['550e8400-e29b-41d4-a716-446655440000'],
  })
  @IsArray()
  @IsNotEmpty()
  userId: string;

  @ApiProperty({
    description: 'List of user IDs belonging to this group',
    example: ['550e8400-e29b-41d4-a716-446655440000'],
  })
  @IsArray()
  userIds: string[];
}

export class GroupDto {
  @ApiProperty({
    description: 'The UUID of the group associated with the campaign',
    example: '550e8400-e29b-41d4-a716-446655440000',
  })
  @IsUUID()
  id: string;

  @ApiProperty({
    description: 'The name of the group',
    example: 'Group A',
  })
  @IsString()
  @IsOptional()
  name: string;
}
  