import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Campaign } from 'src/entities/campaign.entity';
import { Candidate } from 'src/entities/candidate.entity';
import { VoteCandidate } from 'src/entities/voteCandidate.entity';
import { VoteUser } from 'src/entities/voteUser.entity';
import { Repository } from 'typeorm';
import { User } from 'src/entities/user.entity';

@Injectable()
export class VoteService {
  constructor(
    @InjectRepository(VoteUser)
    private voteUserRepository: Repository<VoteUser>,
    @InjectRepository(VoteCandidate)
    private voteCandidateRepository: Repository<VoteCandidate>,
    @InjectRepository(Candidate)
    private candidateRepository: Repository<Candidate>,
    @InjectRepository(Campaign)
    private campaignRepository: Repository<Campaign>,
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  async votar(
    userId: string,
    campaignId: string,
    candidateId?: string,
  ): Promise<string> {

    console.log(userId)
    console.log(campaignId)

    if (!userId || !campaignId) {
      throw new BadRequestException('Faltan los parámetros necesarios: userId y campaignId.');
    }

    const user = await this.userRepository.findOne({
      where: {id : userId},
    })
    if (!user){
      throw new BadRequestException('Usuario no encontrado')
    }

    const campaign = await this.campaignRepository.findOne({
      where: {id : campaignId},
      relations: ['candidates'],
    })
    if (!campaign){
      throw new BadRequestException('Campaña no encontrada')
    }
    
    
    const existingVote = await this.voteUserRepository.findOne({
      where: {
        user: { id: user.id },
        campaign: {id: campaign.id },
      },
    });
    if (existingVote) {
      throw new BadRequestException('La usuaria ya ha votado en esta campaña.');
    }
  
    let blankVote = true
    if (candidateId){
      let candidate = null
      campaign.candidates.map((item) => {
        if(item.id == candidateId){
          candidate = item
        }
      });
      if (!candidate) {
        throw new BadRequestException('El candidato no ha sido encontrado.');
      }
      
      blankVote = false
      let voteCandidate = await this.voteCandidateRepository.findOne({
        where: {
          candidate: { id: candidate.id }, 
        },
      });
    
      if (!voteCandidate) {
        voteCandidate = this.voteCandidateRepository.create({
          candidate: { id: candidateId },
          campaign: { id: campaign.id },
          count:0
        });
      voteCandidate.count += 1;
      await this.voteCandidateRepository.save(voteCandidate);
    }
  }
 
  const newVote = this.voteUserRepository.create({
    user: { id: user.id },
    campaign: { id: campaign.id },
    blankVote: blankVote,
  });
  await this.voteUserRepository.save(newVote);
  
  return 'Votación registrada exitosa y conteo actualizado.';
  }


  async getCandidatesWithVotes(campaignId: string) {
    const candidates = await this.candidateRepository.find({
      where: {
        campaign: { id: campaignId },
      },
      relations: ['user'], 
    });
    const candidatesWithVotes = await Promise.all(candidates.map(async (candidate) => {
      const votes = await this.voteCandidateRepository.count({ 
        where: { 
          candidate: { id: candidate.id }, 
        },
      });
      return {
        ...candidate,
        votes,
        user: candidate.user, 
      };
    }));
  
    return candidatesWithVotes;
  }
  
  
  async getTotalUsersInCampaign(campaignId: string) {
    const campaign = await this.campaignRepository.findOne({
      where: { id: campaignId },
    });
    if (!campaign) {
      throw new NotFoundException('Campaña no encontrada');
    }
    const totalUsers = await this.voteUserRepository.count({
      where: { campaign: { id: campaignId } },
    });
    return totalUsers;
  }


  async getBlankVotes(campaignId: string): Promise<number> {
    const blankVotesCount = await this.voteUserRepository.count({
      where: {
        campaign: { id: campaignId },
        blankVote: true,
      },
    });
    return blankVotesCount;
  }
}
