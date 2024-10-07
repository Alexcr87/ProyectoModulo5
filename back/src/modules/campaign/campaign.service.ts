import {
  Injectable,
  NotFoundException,
  ForbiddenException,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { Campaign } from 'src/entities/campaign.entity';
import { CreateCampaignDto } from 'src/dto/createCampaign.dto';
import { User } from 'src/entities/user.entity';
import { Group } from 'src/entities/group.entity';


@Injectable()
export class CampaignService {
  constructor(
    @InjectRepository(Campaign)
    private readonly campaignRepository: Repository<Campaign>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Group)
    private readonly groupRepository: Repository<Group>
  ) {}

  async createCampaign(
    createCampaignDto: CreateCampaignDto,
  ): Promise<Campaign> {
    const { userId, groups, ...campaignData } = createCampaignDto;

    const user = await this.userRepository.findOne({
      where: { id: userId },
      relations: ['roles'],
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    let foundGroups = [];
    if (groups && groups.length > 0) {
      // Extraer los IDs de los grupos del array `groups`
      const groupIds = groups.map((group) => group.id);
  
      foundGroups = await this.groupRepository.findBy({
        id: In(groupIds),
      });
  
      // Validar que todos los grupos fueron encontrados
      if (foundGroups.length !== groupIds.length) {
        throw new BadRequestException('Some groups not found');
      }
    }

    // logica para que solo los moderadores puedan crear campañas
    // const hasModeratorRole = user.roles.some((role) => role.name === 'moderator');
    // if (!hasModeratorRole) {
    //   throw new ForbiddenException('Only moderators can create campaigns');
    // }

    const campaign = this.campaignRepository.create({
      ...campaignData,
      user,
      groups: foundGroups,  // Asignar grupos a la campaña
    });
    
    return await this.campaignRepository.save(campaign);
  }

  async findAll(): Promise<Campaign[]> {
    return await this.campaignRepository.find({ relations: ['user'] });
  }

  async findOne(id: string): Promise<Campaign> {
    const campaign = await this.campaignRepository.findOne({
      where: { id },
      relations: ['user', 'candidates', 'candidates.user'],
    });
    if (!campaign) {
      throw new NotFoundException('Campaign not found');
    }
    return campaign;
  }

  async getCampaignsByUserId(userId: string): Promise<Campaign[]> {
    return this.campaignRepository.find({
      where: { user: { id: userId } },
      relations: ['candidates'],
    });
  }

  async updateCampaign(id: string, createCampaignDto: CreateCampaignDto): Promise<Campaign> {
    const campaign = await this.campaignRepository.findOne({ where: { id } });
    
    if (!campaign) {
      throw new NotFoundException(`Campaign with ID ${id} not found`);
    }
  
    let foundGroups = [];
    // Si se proporciona groups, buscar los grupos
    if (createCampaignDto.groups && createCampaignDto.groups.length > 0) {
      const groupIds = createCampaignDto.groups.map((group) => group.id);
      const groups = await this.groupRepository.findBy({
        id: In(groupIds),
      });
  
      if (groups.length !== createCampaignDto.groups.length) {
        throw new BadRequestException('Some groups not found');
      }
  
      campaign.groups = groups; // Asignar grupos a la campaña
    }
  
    // Actualizar otros campos
    Object.assign(campaign, createCampaignDto);
  
    return await this.campaignRepository.save(campaign);
  }

  async getCampaignsByGroups(groupIds: string[]): Promise<Campaign[]> {
    const groups = await this.groupRepository.find({
        where: {
            id: In(groupIds),
        },
        relations: ['campaigns'],
    });

    const campaigns = groups.flatMap(group => group.campaigns);
    const uniqueCampaigns = Array.from(new Set(campaigns.map(campaign => campaign.id)))
        .map(id => campaigns.find(campaign => campaign.id === id));

    return uniqueCampaigns;
  }
  
}

