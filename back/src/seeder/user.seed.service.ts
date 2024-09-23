import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../entities/user.entity'; // Asegúrate de que el archivo user.entity.ts exista
import { Role } from '../entities/roles.entity';
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
    // Verifica si el usuario admin ya existe
    const existingUser = await this.userRepository.findOne({
      where: { email: 'admin@example.com' }, // Puedes cambiar este email según prefieras
    });

    if (!existingUser) {
      // Busca el rol "admin"
      const adminRole = await this.roleRepository.findOne({ where: { name: 'admin' } });

      // Crea el usuario admin
      const adminUser = this.userRepository.create({
        name: 'Admin User',
        dni: 12345678, // Cambia por un DNI que prefieras
        email: 'admin@example.com',
        password: await bcrypt.hash('AdminPassword123!', 10), // Cambia la contraseña y asegúrate de encriptarla
        address: '123 Admin St',
        city: 'Admin City',
        country: 'Admin Country',
        roles: [adminRole], // Relaciona el rol admin
      });

      // Guarda el usuario en la base de datos
      await this.userRepository.save(adminUser);
    }
  }
}
