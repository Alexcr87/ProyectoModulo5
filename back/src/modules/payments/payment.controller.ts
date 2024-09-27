import { Body, Controller, Get, Post } from "@nestjs/common";
import { PaymentsService } from "./payment.service";
import { servicePackages } from "./services.package";

@Controller('payments')
export class PaymentsController {
    constructor( private readonly paymentService:PaymentsService){}

    @Get("packages")
    async getPackages(){
        return servicePackages;
    }

    @Get('methods')
    async getPaymentMethods() {
      return this.paymentService.getPaymentMethods();
    }
  
 
    @Post('create')
    async createPayment(@Body() userId: string , packageId: number , payerEmail: string) {
      return this.paymentService.createPayment(userId ,packageId, payerEmail);
    }
  }
  

