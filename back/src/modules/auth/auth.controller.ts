import { BadRequestException, Body, Controller, HttpException, HttpStatus, NotFoundException, Post, Request as Req , Res, UnauthorizedException } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { AuthService } from "./auth.services";
import { CredentialUserDto, newChangePasswordDto } from "src/dto/credentialUserDto";
import { CreateUserDto } from "src/dto/createUserDto";



@ApiTags("Auth")
@Controller("auth")
export class AuthController {
    constructor( private readonly authservice: AuthService ){}

    @Post("sigIn")
    async sigIn (@Body() login: CredentialUserDto) {
    try {
      return  await this.authservice.sigIn(login);
    } catch(error){
        if(error instanceof NotFoundException){
            return {
               statusCode: 404,
               message: error.message
            }
        } else if (error instanceof UnauthorizedException){
            return {
               statusCode: 401,
               message: error.message
            }

        } else if(error instanceof BadRequestException){
            return {
                statusCode: 400,
                message: error.message
             }

        } else {
            throw new HttpException("Error inesperado" , HttpStatus.CONFLICT)
        }
    }
    
    }


    @Post("newPasswordChange")
    async newPasswordUser (@Body() newPasswordDto: newChangePasswordDto, dni:number){
        try {
         return  await this.authservice.newPasswordLogin(newPasswordDto, dni)
        }catch(error){

        }
    }

    @Post("sigUp")
    async sigUp (@Body() userRegister:CreateUserDto){
        try{
     return await this.authservice.sigUp(userRegister)
        }catch(error){
            if(error instanceof HttpException){
                const status = error.getStatus();
                return{
                    statusCode: status,
                    message: error.message
                }
            }
            else {
                throw new HttpException("Error en el registro" , HttpStatus.BAD_REQUEST)
            }
         }
    }

}