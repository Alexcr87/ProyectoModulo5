import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Role } from '../../entities/roles.entity';

@Injectable()
export class RoleSeedService {
  constructor(
    @InjectRepository(Role)
    private readonly roleRepository: Repository<Role>,
  ) {}

  async seed() {
    const roles = [
      { id: 1, name: 'admin', description: 'Administrator with full access' },
      { id: 2, name: 'candidate', description: 'Candidate for elections' },
      { id: 3, name: 'voter', description: 'Voter in the system' },
      { id: 4, name: 'moderator', description: 'Moderator with limited access' },
    ];

    for (const role of roles) {
      const existingRole = await this.roleRepository.findOne({ where: { id: role.id } });

      if (!existingRole) {
        await this.roleRepository.save(role);
      }
    }
  }
}
