import { Body, Controller, Delete, Get, HttpCode, Param, Patch, Post } from '@nestjs/common';
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

  @Patch('assignGroup/:userId')
  @ApiParam({ name: 'userId', required: true, description: 'ID of the user' })
  @ApiResponse({ status: 200, description: 'Grupos asignados al usuario correctamente.' })
  async assignGroupsToUser(
    @Param('userId') userId: string,
    @Body('groupIds') groupIds: string[]
  ): Promise<string> {
    await this.groupService.assignGroupsToUser(userId, groupIds);
    return `Grupos asignados al usuario ${userId} correctamente.`;
  }

  @Patch('changeName/:groupId')
  async changeGroupName(
    @Param('groupId') groupId: string,
    @Body() updateData: { newName: string }
  ): Promise<string> {
    try {
      await this.groupService.changeGroupName(groupId, updateData.newName);
      return `Grupo ${groupId} ha sido renombrado a ${updateData.newName}.`;
    } catch (error) {
      return error.message; 
    }
  }
  


  @Delete()
  async deleteGroups(@Body('ids') ids: string[]): Promise<string> {
    return await this.groupService.deleteGroups(ids);
  }


  @Get()
  async findAll(): Promise<Group[]> {
    return this.groupService.findAll();
  }
}
