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
    const existingVote = await this.voteUserRepository.findOne({
      where: { user: { id: userId }, campaign: { id: campaignId } },
    });

    if (existingVote) {
      throw new BadRequestException('Ya has votado en esta campaña');
    }

    const votoUsuario = new VoteUser();
    const user = await this.userRepository.findOne({ where: { id: userId } });
    const campaign = await this.campaignRepository.findOne({
      where: { id: campaignId },
    });

    votoUsuario.user = user;
    votoUsuario.campaign = campaign;

    if (candidateId) {
      let votoCandidato = new VoteCandidate();
      const candidate = await this.candidateRepository.findOne({
        where: { id: candidateId },
      });
      votoCandidato.candidate = candidate;
      votoCandidato.campaign = campaign;
      await this.voteCandidateRepository.save(votoCandidato);
    } else {
      // Guardar voto en blanco (sin candidateId)
      votoUsuario.blankVote = true;
    }

    await this.voteUserRepository.save(votoUsuario);
    return 'Voto registrado con éxito';
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
