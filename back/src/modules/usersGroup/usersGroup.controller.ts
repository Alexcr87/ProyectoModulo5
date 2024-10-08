import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateGroupDto } from 'src/dto/group.dto';
import { GroupService } from 'src/modules/usersGroup/usersGroup.service';
import { Group } from 'src/entities/group.entity'; // Importación corregida

@ApiTags('groups')
@Controller('groups')
export class GroupController {
  constructor(private readonly groupService: GroupService) {}

  @Post()
  async create(@Body() createGroupDto: CreateGroupDto): Promise<Group> {
    return this.groupService.createGroup(createGroupDto);
  }

  @Get('user/:userId')
  @ApiParam({ name: 'userId', required: true, description: 'ID of the user' })
  @ApiResponse({ status: 200, description: 'List of campaigns for the user.', type: [Group] })
  async getGroupsByUserId(@Param('userId') userId: string): Promise<Group[]> {
    return this.groupService.getGroupsByUserId(userId);
  }

  @Get()
  async findAll(): Promise<Group[]> {
    return this.groupService.findAll();
  }
}
