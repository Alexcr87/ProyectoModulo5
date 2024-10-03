import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Account } from 'src/entities/account.entity';
import { User } from 'src/entities/user.entity';
import { AccountSeeder } from './seed.service';

@Module({
  imports: [TypeOrmModule.forFeature([Account])],
  providers: [AccountSeeder],
  exports: [AccountSeeder],
})
export class AccountSeedModule {}