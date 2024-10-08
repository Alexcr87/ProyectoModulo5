import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { Role } from 'src/entities/roles.entity';
import { OrganizationalStructure } from 'src/entities/organizationalStructure.entity';
// import { Account } from 'src/entities/account.entity';
import { MailModule } from '../mail/mail.module';
import { MailService } from '../mail/mail.service';
import { requiresAuth } from 'express-openid-connect';
import { GroupModule } from '../usersGroup/usersGroup.module';
import { Group } from 'src/entities/group.entity';
import { GroupService } from '../usersGroup/usersGroup.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, Role, OrganizationalStructure,Group]),
    MailModule,
    GroupModule
  ],
  providers: [UserService, MailService],
  controllers: [UserController],
  exports: [TypeOrmModule, UserService],
})
export class UserModule {}
