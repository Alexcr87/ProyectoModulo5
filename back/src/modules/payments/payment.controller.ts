// import { Body, Controller, Get, Post } from '@nestjs/common';
// import { PaymentsService } from './payment.service';
// import { Repository } from 'typeorm';
// import { Account } from 'src/entities/account.entity';
// import { InjectRepository } from '@nestjs/typeorm';
// import { PaymentDto } from 'src/dto/payment.dto';
// import { ApiTags } from '@nestjs/swagger';

// @ApiTags('Payments')
// @Controller('payments')
// export class PaymentsController {
//   constructor(
//     private readonly paymentService: PaymentsService,
//     @InjectRepository(Account)
//     private readonly accountRepository: Repository<Account>,
//   ) {}

//   @Get('packages')
//   async getPackages() {
//     return await this.accountRepository.find();
//   }

//   @Get('methods')
//   async getPaymentMethods() {
//     return await this.paymentService.getFilteredPaymentMethods();
//   }

//   @Post('create')
//   async createPayment(@Body() PaymentDto: PaymentDto) {
//     const { userId, packageId, payerEmail, paymentMethodId, installments } =
//       PaymentDto;
//     return this.paymentService.createPayment(
//       userId,
//       packageId,
//       payerEmail,
//       paymentMethodId,
//       installments,
//     );
//   }
// }
