import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Group } from '../../entities/group.entity'; // Asegúrate de que la ruta sea correcta
import { GroupService } from 'src/modules/usersGroup/usersGroup.service';
import { GroupController } from 'src/modules/usersGroup/usersGroup.controller';
import { User } from 'src/entities/user.entity';



@Module({
  imports: [
    TypeOrmModule.forFeature([Group,User]),
    // Otros módulos necesarios
  ],
  controllers: [GroupController],
  providers: [GroupService],
  exports: [TypeOrmModule], // Exporta el módulo si es necesario en otros lugares
})
export class GroupModule {}
