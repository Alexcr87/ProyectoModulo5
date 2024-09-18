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

    const candidate = this.candidateRepository.create({
      ...candidateData,
      user,
    });

    return this.candidateRepository.save(candidate);
  }

  findAll(): Promise<Candidate[]> {
    return this.candidateRepository.find({ relations: ['user', 'votes'] });
  }

  findOne(id: string): Promise<Candidate> {
    return this.candidateRepository.findOne({
      where: { id },
      relations: ['user', 'votes'],
    });
  }

  async updateCandidate(id: string, updateData: Partial<Candidate>): Promise<Candidate> {
    const candidate = await this.candidateRepository.findOne({where: {id}});
    
    if (!candidate) {
      throw new NotFoundException('Candidate not found');
    }
  
    const updatedCandidate = await this.candidateRepository.save({
      ...candidate,  
      ...updateData, 
    });
  
    return updatedCandidate;
  }
  

  async deleteCandidate(id: string): Promise<void> {
    const candidate = await this.candidateRepository.findOne({ where: { id }, relations: ['user'] });
    if (!candidate) {
      throw new NotFoundException(`Candidate with ID ${id} not found`);
    }
    await this.candidateRepository.remove(candidate);
  }
}
