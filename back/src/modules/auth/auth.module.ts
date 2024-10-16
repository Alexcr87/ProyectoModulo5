import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.services';
import { UserService } from '../user/user.service';
import { Role } from 'src/entities/roles.entity';
import { MailService } from '../mail/mail.service';
import { OrganizationalStructure } from 'src/entities/organizationalStructure.entity';
// import { Account } from 'src/entities/account.entity';

import { GroupModule } from '../usersGroup/usersGroup.module';
import { CampaignModule } from '../campaign/campaign.module';
import { AccountSeedModule } from 'src/seeder/accountSeeder/seed.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, Role, OrganizationalStructure]),
    CampaignModule,
    GroupModule,
    AccountSeedModule
  ],
  controllers: [AuthController],
  providers: [AuthService, UserService, MailService],
})

export class AuthModule {};

