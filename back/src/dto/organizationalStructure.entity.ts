import { IsNotEmpty } from 'class-validator';

export class CreateStructureOrganizationDto {
  @IsNotEmpty()
  parentId: string;

  @IsNotEmpty()
  childId: string;
}
