import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { CreateGroupDto } from 'src/dto/group.dto';
import { Group } from 'src/entities/group.entity';
import { User } from 'src/entities/user.entity';

@Injectable()
export class GroupService {
    constructor(
      @InjectRepository(Group)
      private readonly groupRepository: Repository<Group>,
      @InjectRepository(User)
      private readonly userRepository: Repository<User>,
    ) {}

    async createGroup(createGroupDto: CreateGroupDto): Promise<Group> {

        const { userId, ...groupData } = createGroupDto;

        const user = await this.userRepository.findOne({
            where: { id: userId }
          });
      
          if (!user) {
            throw new NotFoundException('User not found');
          }

        const group = this.groupRepository.create({...groupData, user});
        
        if (createGroupDto.userIds && createGroupDto.userIds.length > 0) {
            const users = await this.userRepository.findBy({
                id: In(createGroupDto.userIds),
            });
            if (users.length !== createGroupDto.userIds.length) {
                throw new BadRequestException('Some users not found');
            }

            group.users = users;  // Asociamos los usuarios al grupo
        }

        return await this.groupRepository.save(group);
    }

    async findAll(): Promise<Group[]> {
        return this.groupRepository.find({
            relations: ['users'], // Incluimos los usuarios relacionados
        });
    }

    async getGroupsByUserId(userId: string): Promise<Group[]> {
        return this.groupRepository.find({
          where: { user: { id: userId } }
        });
      }
}
