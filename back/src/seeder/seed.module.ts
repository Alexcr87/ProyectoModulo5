import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Role } from '../entities/roles.entity';
import { User } from '../entities/user.entity'; // Entidad de usuarios
import { RoleSeedService } from './seed.service';
import { UserSeedService } from './user.seed.service'; // El nuevo servicio para usuarios

@Module({
  imports: [TypeOrmModule.forFeature([Role, User])], // Incluye también User
  providers: [RoleSeedService, UserSeedService], // Añade el nuevo servicio
  exports: [RoleSeedService, UserSeedService],
})
export class SeedModule {}
