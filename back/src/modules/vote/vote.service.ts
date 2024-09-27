import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Campaign } from "src/entities/campaign.entity";
import { Candidate } from "src/entities/candidate.entity";
import { VoteCandidate } from "src/entities/voteCandidate.entity";
import { VoteUser } from "src/entities/voteUser.entity";
import { Repository } from "typeorm";
import { User } from "src/entities/user.entity";

@Injectable()
export class VoteService {
  constructor(
    @InjectRepository(VoteUser) private voteUserRepository: Repository<VoteUser>,
    @InjectRepository(VoteCandidate) private voteCandidateRepository: Repository<VoteCandidate>,
    @InjectRepository(Candidate) private candidateRepository: Repository<Candidate>,
    @InjectRepository(Campaign) private campaignRepository: Repository<Campaign>,
    @InjectRepository(User) private userRepository: Repository<User>
  ) {}

  async votar(userId: string, candidateId: string): Promise<string> {
    const candidate = await this.candidateRepository.findOne({
      where: { id: candidateId },
      relations: ['campaign'],  // Incluimos la campaña en la búsqueda
    });
  
    if (!candidate) {
      throw new BadRequestException('El candidato no existe');
    }
    
    const campaignId = candidate.campaign.id;
    const existingVote = await this.voteUserRepository.findOne({
      where: { user: { id: userId }, campaign: { id: campaignId } },
    });
    if (existingVote) {
      throw new BadRequestException('Ya has votado en esta campaña');
    }
  
    const votoUsuario = new VoteUser();
    const user = await this.userRepository.findOne({ where: { id: userId } });
    const campaign = await this.campaignRepository.findOne({ where: { id: campaignId } });
  
    votoUsuario.user = user;
    votoUsuario.campaign = campaign;
    await this.voteUserRepository.save(votoUsuario);
  
    let votoCandidato = await this.voteCandidateRepository.findOne({
      where: { candidate: { id: candidateId }, campaign: { id: campaignId } },
    });
  
    if (!votoCandidato) {
      votoCandidato = new VoteCandidate();
      votoCandidato.candidate = candidate;
      votoCandidato.campaign = campaign;
      votoCandidato.count = 1;  
    } else {
      votoCandidato.count += 1;  
    }
    await this.voteCandidateRepository.save(votoCandidato);
    return 'Voto registrado con éxito';
  }

  async getCandidatesWithVotes(campaignId: string) {
    const campaign = await this.campaignRepository.findOne({ where: { id: campaignId } });
    if (!campaign) {
      throw new NotFoundException('Campaña no encontrada');
    }
    const candidates = await this.candidateRepository.find({ where: { campaign: { id: campaignId } } });

    const candidatesWithVotes = await Promise.all(
      candidates.map(async candidate => {
        const voteRecord = await this.voteCandidateRepository.findOne({
          where: { candidate: { id: candidate.id }, campaign: { id: campaignId } },
        });
        const votes = voteRecord ? voteRecord.count : 0;
        return {
          candidate,
          votes,
        };
      }),
    );
    return candidatesWithVotes;
  }

 
  async getTotalUsersInCampaign(campaignId: string) {
    const campaign = await this.campaignRepository.findOne({ where: { id: campaignId } });
    if (!campaign) {
      throw new NotFoundException('Campaña no encontrada');
    }
    const totalUsers = await this.voteUserRepository.count({ where: { campaign: { id: campaignId } } });
    return totalUsers;
  }
}  
 
