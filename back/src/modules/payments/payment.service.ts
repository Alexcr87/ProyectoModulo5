import { Body, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { MercadoPagoConfig, Preference } from 'mercadopago';
import { UserService } from '../user/user.service';
import { Repository } from 'typeorm';
import { Account } from 'src/entities/account.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { config as dotenvConfig } from 'dotenv';
import { User } from 'src/entities/user.entity';

dotenvConfig({ path: '.env.development' });

@Injectable()
export class PaymentsService {
 
  constructor(
    private readonly userService: UserService,
    @InjectRepository (User) private repositoryUser: Repository<User>,
    @InjectRepository(Account) private repositoryAccount: Repository<Account>) {}

async createPreference(accountId:number) {

  const client = new MercadoPagoConfig({
    accessToken: process.env.TOKEN_MERCADOPAGO,  
  })
  const preference = new Preference(client);

  const account = await this.repositoryAccount.findOne({where :{id:accountId}});

  if (!account) {
    throw new HttpException('Cuenta no encontrada', HttpStatus.NOT_FOUND);
  }
  const items = [{
    id: account.id.toString(),
    title: account.name,
    quantity: 1,
    unit_price: account.price,
  }];

  const responseMp = await preference.create({
    body: {
      items: items,
    },
  });

  if (!responseMp.id) {
    throw new HttpException('No se pudo crear la preferencia de pago', HttpStatus.BAD_REQUEST);
  }
  return { preferenceId: responseMp.id };
} 
}







