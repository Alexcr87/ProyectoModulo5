import { BadRequestException, Injectable } from "@nestjs/common";
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

  async votar(userId: string, campaignId: string, candidateId: string): Promise<string> {
    // Verificar si el usuario ya ha votado en esta campaña
    const existingVote = await this.voteUserRepository.findOne({
      where: { user: { id: userId }, campaign: { id: campaignId } },
    });

    if (existingVote) {
      throw new BadRequestException('Ya has votado en esta campaña');
    }

    // Registrar el voto del usuario en la campaña
    const voteUser = new VoteUser();
    const user = await this.userRepository.findOne({ where: { id: userId } }); // Usar el objeto para buscar
    const campaign = await this.campaignRepository.findOne({ where: { id: campaignId } }); // Usar el objeto para buscar

    voteUser.user = user;
    voteUser.campaign = campaign;
    await this.voteUserRepository.save(voteUser);

    // Incrementar el conteo de votos para el candidato
    let voteCandidate = await this.voteCandidateRepository.findOne({
      where: { candidate: { id: candidateId }, campaign: { id: campaignId } },
    });

    // Si aún no hay registro de votos para el candidato en esta campaña, creamos uno
    if (!voteCandidate) {
      voteCandidate = new VoteCandidate();
      const candidate = await this.candidateRepository.findOne({ where: { id: candidateId } }); // Usar el objeto para buscar
      voteCandidate.candidate = candidate;
      voteCandidate.campaign = campaign;
      voteCandidate.count = 1;  // Primer voto
    } else {
      voteCandidate.count += 1;  // Incrementamos el conteo de votos
    }

    await this.voteCandidateRepository.save(voteCandidate);

    return 'Voto registrado con éxito';  // No exponemos a quién votó
  }

  // Verificar si un usuario ya ha votado en una campaña
  async verificarVoto(userId: string, campaignId: string): Promise<boolean> {
    const vote = await this.voteUserRepository.findOne({
      where: { user: { id: userId }, campaign: { id: campaignId } },
    });

    return !!vote;  // Devuelve true si ya votó, false si no
  }
}
