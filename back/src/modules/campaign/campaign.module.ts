import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Campaign } from 'src/entities/campaign.entity';
import { CampaignService } from 'src/modules/campaign/campaign.service';
import { CampaignController } from 'src/modules/campaign/campaign.controller';
import { User } from 'src/entities/user.entity';
import { Group } from 'src/entities/group.entity';
import { Candidate } from 'src/entities/candidate.entity';
import { VoteUser } from 'src/entities/voteUser.entity';
import { VoteCandidate } from 'src/entities/voteCandidate.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Campaign, User,Group,Candidate,VoteUser,VoteCandidate])],
  controllers: [CampaignController],
  providers: [CampaignService],
  exports: [TypeOrmModule]
})
export class CampaignModule {}
