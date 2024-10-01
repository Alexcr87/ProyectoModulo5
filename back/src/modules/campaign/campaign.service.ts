import {
  Injectable,
  NotFoundException,
  ForbiddenException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Campaign } from 'src/entities/campaign.entity';
import { CreateCampaignDto } from 'src/dto/createCampaign.dto';
import { User } from 'src/entities/user.entity';

@Injectable()
export class CampaignService {
  constructor(
    @InjectRepository(Campaign)
    private readonly campaignRepository: Repository<Campaign>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async createCampaign(
    createCampaignDto: CreateCampaignDto,
  ): Promise<Campaign> {
    const { userId, ...campaignData } = createCampaignDto;

    const user = await this.userRepository.findOne({
      where: { id: userId },
      relations: ['roles'],
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }
    // logica para que solo los moderadores puedan crear campañas
    // const hasModeratorRole = user.roles.some((role) => role.name === 'moderator');
    // if (!hasModeratorRole) {
    //   throw new ForbiddenException('Only moderators can create campaigns');
    // }
    const campaign = this.campaignRepository.create({
      ...campaignData,
      user,
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
}
