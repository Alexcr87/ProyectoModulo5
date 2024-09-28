import { ApiProperty } from "@nestjs/swagger"
import { IsNotEmpty, IsNumber, IsString } from "class-validator"



export class PaymentDto {
    @ApiProperty({example:"54258-685-54dhhf"})
    @IsString()
    @IsNotEmpty({message:"userId must not be empty"})
    userId: string 


    @ApiProperty({example:"2"})
    @IsNumber()
    @IsNotEmpty({message:"packageId must not be empty"})
    packageId: number


    @ApiProperty({example:"mail@gmail.com"})
    @IsString()
    @IsNotEmpty({message:"payerEmail must not be empty"})
    payerEmail: string

    @ApiProperty()
    @IsString()
    @IsNotEmpty({message:"paymentMethodId must not be empty"})
    paymentMethodId: string

    @ApiProperty()
    @IsNumber()
    @IsNotEmpty({message:" installments must not be empty"})
    installments: number
}