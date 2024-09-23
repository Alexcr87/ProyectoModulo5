import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
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

  async createCampaign(createCampaignDto: CreateCampaignDto): Promise<Campaign> {
    const { userId, ...campaignData } = createCampaignDto;

    // Verificar si el usuario existe
    const user = await this.userRepository.findOne({
      where: { id: userId },
      relations: ['roles'],
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    // Verificar si el usuario tiene el rol 'moderator'
    const hasModeratorRole = user.roles.some((role) => role.name === 'moderator');
    if (!hasModeratorRole) {
      throw new ForbiddenException('Only moderators can create campaigns');
    }

    // Crear y guardar la campaña
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
      relations: ['user'],
    });

    if (!campaign) {
      throw new NotFoundException('Campaign not found');
    }

    return campaign;
  }

  // Aquí puedes agregar más métodos como update, delete, etc.
}
