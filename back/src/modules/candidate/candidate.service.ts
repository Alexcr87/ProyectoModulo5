import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Candidate } from "../../entities/candidate.entity";
import { CreateCandidateDto } from "../../dto/createCandidateDto";
import { User } from "../../entities/user.entity";
import { CloudinaryService } from '../../cloudinary/cloudinary.service';
import { Role } from "src/entities/roles.entity";


@Injectable()
export class CandidateService {
  constructor(
    @InjectRepository(Candidate)
    private readonly candidateRepository: Repository<Candidate>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly cloudinaryService: CloudinaryService,
    @InjectRepository(Role) 
    private roleRepository: Repository<Role>,
  ) {}

  async create(createCandidateDto: CreateCandidateDto, file: Express.Multer.File): Promise<Candidate> {
    const { userId, ...candidateData } = createCandidateDto;
  
    const user = await this.userRepository.findOne({
      where: { id: userId },
      relations: ['roles'],  
    });
  
    if (!user) {
      throw new NotFoundException('User not found');
    }

    if (!Array.isArray(user.roles)) {
      user.roles = [];
    }
  
    const candidateRole = await this.roleRepository.findOne({ where: { name: 'candidate' } });
    if (!candidateRole) {
      throw new NotFoundException('Role "candidate" not found');
    }
  
    const hasCandidateRole = user.roles.some(role => role.name === 'candidate');
  
    if (!hasCandidateRole) {
      user.roles.push(candidateRole);
      await this.userRepository.save(user);  
    }
  
    const proposalString = JSON.stringify(createCandidateDto.proposals);
    let imageUrl: string | undefined;
    console.log(imageUrl)

    if (file) {
      const uploadResult = await this.cloudinaryService.uploadFile(file.buffer, file.originalname);
      imageUrl = uploadResult;  // URL segura de Cloudinary
    }

    const candidate = this.candidateRepository.create({
      ...candidateData,
      proposals: proposalString,  
      imgUrl: imageUrl,  // Almacenar la URL de la imagen si existe
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
  
    if (updateData.proposals) {
      updateData.proposals = JSON.stringify(updateData.proposals);
    }

    const updatedCandidate = await this.candidateRepository.save({
      ...candidate,
      ...updateData,
    });
    return {
      ...updatedCandidate,
      proposals: JSON.parse(updatedCandidate.proposals),
    };
  }

  async deleteCandidate(id: string): Promise<void> {
    const candidate = await this.candidateRepository.findOne({
      where: { id },
      relations: ['user', 'user.roles'] 
    });
  
    if (!candidate) {
      throw new NotFoundException(`Candidate with ID ${id} not found`);
    }
  
    const candidateRole = await this.roleRepository.findOneBy({ id: 2 }); 
    const voterRole = await this.roleRepository.findOneBy({ id: 1 }); 

    if (!candidateRole || !voterRole) {
      throw new NotFoundException('Roles not found');
    }
  
    const user = candidate.user;
    user.roles = user.roles.filter(role => role.id !== candidateRole.id);
    const hasVoterRole = user.roles.some(role => role.id === voterRole.id);
    
    if (!hasVoterRole) {
      user.roles.push(voterRole); 
    }
    await this.userRepository.save(user);
    await this.candidateRepository.remove(candidate);
  }
}
