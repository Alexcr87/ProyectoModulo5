import { Body, Controller, Get, Post } from '@nestjs/common';
import { PaymentsService } from './payment.service';
import { Repository } from 'typeorm';
import { Account } from 'src/entities/account.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { PaymentDto } from 'src/dto/payment.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Payments')
@Controller('payments')
export class PaymentsController {
  constructor(
    private readonly paymentService: PaymentsService,
    @InjectRepository(Account)
    private readonly accountRepository: Repository<Account>,
  ) {}

  @Get('packages')
  async getPackages() {
    return await this.accountRepository.find();
  }

  @Post("preference")
  async getPreference (@Body() body: {accountId: number} ){
    const { accountId } = body;
    return await this.paymentService.createPreference(accountId);
  }
}