import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../../entities/user.entity'; // Asegúrate de que el archivo user.entity.ts exista
import { Role } from '../../entities/roles.entity';
import * as bcrypt from 'bcrypt'; // Para encriptar la contraseña

@Injectable()
export class UserSeedService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Role)
    private readonly roleRepository: Repository<Role>,
  ) {}

  async seed() {
    const existingUser = await this.userRepository.findOne({
      where: { email: 'admin@example.com' }, 
    });

    if (!existingUser) {
      // Busca el rol "admin"
      const adminRole = await this.roleRepository.findOne({ where: { name: 'admin' } });

    
      const adminUser = this.userRepository.create({
        name: 'Admin User',
        dni: 12345678,
        email: 'admin@example.com',
        password: await bcrypt.hash('developer', 10),
        address: '123 Admin St',
        city: 'Admin City',
        country: 'Admin Country',
        roles: [adminRole], 
      });
      await this.userRepository.save(adminUser);
    }
  }
}
