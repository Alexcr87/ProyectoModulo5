import { Injectable } from "@nestjs/common";
import { PaymentMethod,MercadoPagoConfig,Payment } from "mercadopago";
import { servicePackages, Package } from "./services.package";
import { UserService } from "../user/user.service";


@Injectable()
export class PaymentsService {
    private paymentMethods : PaymentMethod;
    private payment:Payment;
    constructor (private readonly userService: UserService){
        const client = new MercadoPagoConfig({accessToken: 'YOUR_ACCESS_TOKEN'});
        this.paymentMethods = new PaymentMethod(client);
        this.payment = new Payment(client);
    }

    async getPaymentMethods() {
       
          const result = await this.paymentMethods.get();
          

         if (!result){
          throw new Error('failed to get payment methods:');
        }
        return result;
      }

      async createPayment(userId: string, packageId: number, payerEmail: string) {
        const selectedPackage = servicePackages.find(pkg => pkg.id === packageId);
        
        if (!selectedPackage) {
          throw new Error("package not found");
        }
    
        const paymentData = {
            body: {
                transaction_amount: selectedPackage.price,
                description: selectedPackage.name,
                payment_method_id: 'visa', 
                payer: {
                  email: payerEmail,
                },
                installments: 1,
              },
        };
    
        
        const paymentResponse = await this.payment.create(paymentData);
         
        if (!paymentResponse) {
          throw new Error('Failed to create payment');
        }
        if (paymentResponse.status === 'approved') {
          
          const updatedUser = await this.userService.assignPackageToUser(userId, selectedPackage.id);
          return {
              paymentResponse,
              updatedUser,
          };
      } else {
          throw new Error('Payment not approved');
      }
  
        return paymentResponse;
      }
    }
    
