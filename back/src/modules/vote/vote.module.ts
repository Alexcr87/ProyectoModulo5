import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VoteService } from './vote.service';
import { VoteController } from './vote.controller';
import { VoteUser } from 'src/entities/voteUser.entity';
import { VoteCandidate } from 'src/entities/voteCandidate.entity';
import { Candidate } from 'src/entities/candidate.entity';
import { Campaign } from 'src/entities/campaign.entity';
import { User } from 'src/entities/user.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([VoteUser, VoteCandidate, Candidate, Campaign, User]),
  ],
  controllers: [VoteController],
  providers: [VoteService],
})
export class VoteModule {}
