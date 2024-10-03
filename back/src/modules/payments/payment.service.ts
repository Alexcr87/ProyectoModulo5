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
    throw new HttpException('Account not found', HttpStatus.NOT_FOUND);
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
    throw new HttpException('Failed to create payment preference.', HttpStatus.BAD_REQUEST);
  }
  return { preferenceId: responseMp.id };
} 
}








    /*
    this.paymentMethods = new PaymentMethod(client);
    this.payment = new Payment(client);
  }

  async getFilteredPaymentMethods() {
    const result = await this.paymentMethods.get();

    if (!result) {
      throw new Error('failed to get payment methods:');
    }
    const simplifiedMethods = result
      .filter((method) => method.status === 'active')
      .map((method) => ({
        id: method.id,
        name: method.name,
        payment_type_id: method.payment_type_id,
        thumbnail: method.secure_thumbnail,
        min_allowed_amount: method.min_allowed_amount,
        max_allowed_amount: method.max_allowed_amount,
        deferred_capture: method.deferred_capture,
      }));

    return simplifiedMethods;
  }

  async createPayment(
    userId: string,
    packageId: number,
    payerEmail: string,
    paymentMethodId: string,
    installments: number,
  ) {
    const selectedPackage = await this.repositoryAccount.findOne({
      where: { id: packageId },
    });

    if (!selectedPackage) {
      throw new Error('package not found');
    }

    const paymentData = {
      body: {
        transaction_amount: selectedPackage.price,
        description: selectedPackage.name,
        payment_method_id: paymentMethodId,
        payer: {
          email: payerEmail,
        },
        installments: installments,
      },
    };

    const paymentResponse = await this.payment.create(paymentData);

    if (!paymentResponse) {
      throw new Error('Failed to create payment');
    }
    if (paymentResponse.status === 'approved') {
      const updatedUser = await this.userService.assignPackageToUser(
        userId,
        selectedPackage.id,
      );
      return {
        paymentResponse,
        updatedUser,
      };
    } else {
      throw new Error('Payment not approved');
    }
  }
}*/