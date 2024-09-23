import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Campaign } from 'src/entities/campaign.entity';
import { CampaignService } from 'src/modules/campaign/campaign.service';
import { CampaignController } from 'src/modules/campaign/campaign.controller';
import { User } from 'src/entities/user.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Campaign, User]),
  ],
  controllers: [CampaignController],
  providers: [CampaignService],
})
export class CampaignModule {}