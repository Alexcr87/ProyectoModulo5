import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Role } from '../../entities/roles.entity';
import { RoleSeedService } from '../../seeder/seed.service';

@Module({
  imports: [TypeOrmModule.forFeature([Role])],
  providers: [RoleSeedService], 
  exports: [RoleSeedService],  
})
export class RoleModule {}
