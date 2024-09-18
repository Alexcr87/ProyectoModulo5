import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Candidate } from "../../entities/candidate.entity";
import { CreateCandidateDto } from "../../dto/createCandidateDto";
import { User } from "../../entities/user.entity";

@Injectable()
export class CandidateService {
  constructor(
    @InjectRepository(Candidate)
    private readonly candidateRepository: Repository<Candidate>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async create(createCandidateDto: CreateCandidateDto): Promise<Candidate> {
    const { userId, ...candidateData } = createCandidateDto;
  
    const user = await this.userRepository.findOneBy({ id: userId });
    if (!user) {
      throw new NotFoundException('User not found');
    }
  
    // Convertir el array 'proposal' a cadena JSON
    const proposalString = JSON.stringify(createCandidateDto.proposals);
  
    const candidate = this.candidateRepository.create({
      ...candidateData,
      proposals: proposalString,  // Almacenar propuestas como cadena JSON
      user,  
    });
  
    return this.candidateRepository.save(candidate);
  }
  findAll(): Promise<Candidate[]> {
    return this.candidateRepository.find({ relations: ['user', 'votes'] })
      .then(candidates => {
        return candidates.map(candidate => {
          return {
            ...candidate,
            proposals: JSON.parse(candidate.proposals),  // Convertir string a array
          };
        });
      });
  }
  
  // Retorna un solo candidato con las propuestas como un array
  findOne(id: string): Promise<Candidate> {
    return this.candidateRepository.findOne({
      where: { id },
      relations: ['user', 'votes'],
    }).then(candidate => {
      if (candidate) {
        return {
          ...candidate,
          proposals: JSON.parse(candidate.proposals),  // Convertir string a array
        };
      }
      return null;
    });
  }
  
  async updateCandidate(id: string, updateData: Partial<Candidate>): Promise<Candidate> {
    const candidate = await this.candidateRepository.findOne({ where: { id } });
  
    if (!candidate) {
      throw new NotFoundException('Candidate not found');
    }
  
    // Verifica si proposals existe en los datos de actualización
    if (updateData.proposals) {
      // Asegúrate de que se convierta correctamente el array de proposals a string antes de guardar
      updateData.proposals = JSON.stringify(updateData.proposals);
    }
  
    // Actualiza el candidato
    const updatedCandidate = await this.candidateRepository.save({
      ...candidate,
      ...updateData,
    });
  
    // Devuelve el candidato actualizado, convirtiendo las propuestas de nuevo a array
    return {
      ...updatedCandidate,
      proposals: JSON.parse(updatedCandidate.proposals),
    };
  }
  

  async deleteCandidate(id: string): Promise<void> {
    const candidate = await this.candidateRepository.findOne({ where: { id }, relations: ['user'] });
    if (!candidate) {
      throw new NotFoundException(`Candidate with ID ${id} not found`);
    }
    await this.candidateRepository.remove(candidate);
  }
}
