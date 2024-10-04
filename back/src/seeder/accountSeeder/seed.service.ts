import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Account } from 'src/entities/account.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AccountSeeder {
  constructor(
    @InjectRepository(Account) private accountService: Repository<Account>,
  ) {}

  async seed() {
    const accounts = [
      { id: 0, name: 'No Account', maxParticipants: 0, price: 0, description: "sin cuenta"},
      { id: 1, name: 'Free', maxParticipants: 50, price: 0, description: "Hasta 50 usuarios" },
      { id: 2, name: 'Basic', maxParticipants: 100, price: 10, description: "Hasta 100 usuarios" },
      { id: 3, name: 'Standard', maxParticipants: 500, price: 50, description: "Hasta 500 usuarios" },
      { id: 4, name: 'Premium', maxParticipants: 1000, price: 100, description: "Hasta 1000 usuarios"},
    ];

    for (const account of accounts) {
      const existingaccount = await this.accountService.findOne({
        where: { name: account.name },
      });

      if (!existingaccount) {
        await this.accountService.save(account);
      } else {
        await this.accountService.update({ id: existingaccount.id }, account);
      }
      }
    }
  }