import { Module } from "@nestjs/common";
import { PaymentsService } from "./payment.service";
import { PaymentsController } from "./payment.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Account } from "src/entities/account.entity";
import { UserModule } from "../user/user.module";
import { UserService } from "../user/user.service";

@Module({
    imports: [TypeOrmModule.forFeature([Account]),
    UserModule
],
    controllers:[PaymentsController] ,
    providers: [PaymentsService],
    exports:[PaymentsService]
    
})

export class PaymentModule{}