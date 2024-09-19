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
  
    // Buscar el usuario por ID
    const user = await this.userRepository.findOne({
      where: { id: userId },
      relations: ['roles'],  // Traer los roles del usuario
    });
  
    if (!user) {
      throw new NotFoundException('User not found');
    }
  
    // Verificar si el usuario ya tiene un array de roles
    if (!Array.isArray(user.roles)) {
      user.roles = [];
    }
  
    // Buscar el rol de "candidate"
    const candidateRole = await this.roleRepository.findOne({ where: { name: 'candidate' } });
    if (!candidateRole) {
      throw new NotFoundException('Role "candidate" not found');
    }
  
    // Verificar si el usuario ya tiene el rol de "candidate"
    const hasCandidateRole = user.roles.some(role => role.name === 'candidate');
  
    if (!hasCandidateRole) {
      // Agregar el rol de "candidate" al usuario
      user.roles.push(candidateRole);
      await this.userRepository.save(user);  // Guardar el usuario con el nuevo rol
    }
  
    // Convertir propuestas a string JSON
    const proposalString = JSON.stringify(createCandidateDto.proposals);
  
    // Subir imagen a Cloudinary si existe un archivo
    let imageUrl: string | undefined;
    if (file) {
      const uploadResult = await this.cloudinaryService.uploadFile(file.buffer, file.originalname);
      imageUrl = uploadResult;  // URL segura de Cloudinary
    }
  
    // Crear el candidato con la imagen (si existe) y las propuestas
    const candidate = this.candidateRepository.create({
      ...candidateData,
      proposals: proposalString,  // Almacenar propuestas como cadena JSON
      imgUrl: imageUrl,  // Almacenar la URL de la imagen si existe
      user,  // Relacionar el candidato con el usuario
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
    // Buscar el candidato por ID con la relación del usuario
    const candidate = await this.candidateRepository.findOne({ where: { id }, relations: ['user'] });
    if (!candidate) {
      throw new NotFoundException(`Candidate with ID ${id} not found`);
    }
  
    // Buscar el rol de candidato (asegúrate de que el ID del rol de candidato es correcto)
    const candidateRole = await this.roleRepository.findOneBy({ id: 1 }); // Cambia '1' por el ID real de tu rol de candidato
    if (!candidateRole) {
      throw new NotFoundException('Candidate role not found');
    }
  
    // Eliminar el rol de "candidato" del usuario
    const user = candidate.user;
    user.roles = user.roles.filter(role => role.id !== candidateRole.id); // Filtrar para eliminar el rol de candidato
    await this.userRepository.save(user); // Guardar el usuario con los roles actualizados
  
    // Finalmente, eliminar el candidato
    await this.candidateRepository.remove(candidate);
  }  

}
