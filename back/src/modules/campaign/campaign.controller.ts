import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import { CampaignService } from './campaign.service';
import { CreateCampaignDto } from 'src/dto/createCampaign.dto';
import { Campaign } from 'src/entities/campaign.entity';

@Controller('campaigns')
export class CampaignController {
  constructor(private readonly campaignService: CampaignService) {}

  @Post()
  async create(
    @Body() createCampaignDto: CreateCampaignDto,
  ): Promise<Campaign> {
    return this.campaignService.createCampaign(createCampaignDto);
  }

  @Get()
  async findAll(): Promise<Campaign[]> {
    return this.campaignService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Campaign> {
    return this.campaignService.findOne(id);
  }

  @Get('user/:userId')
  async getCampaignsByUserId(
    @Param('userId') userId: string,
  ): Promise<Campaign[]> {
    return this.campaignService.getCampaignsByUserId(userId);
  }
}
