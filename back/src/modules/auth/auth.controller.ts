import { BadRequestException, Body, Controller, HttpException, HttpStatus, NotFoundException, Post, Query, Request as Req , Res, UnauthorizedException, UseGuards } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { AuthService } from "./auth.services";
import { CredentialUserDto, newChangePasswordDto } from "src/dto/credentialUserDto";
import { CreateUserDto } from "src/dto/createUserDto";
//import { AllowedUserIds } from "src/roles/roles.decorator";
import { AuthGuard } from "src/Guards/auth.guard";
import { RolesGuard } from "src/Guards/roles.guard";



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
            const status = error.getStatus();
            return {
               statusCode: status,
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
            throw new HttpException("unexpected error" , HttpStatus.CONFLICT)
        }
    }
    
    }


    @Post("newPasswordChange")
    async newPasswordUser (@Body() newCredential: newChangePasswordDto){
        try {
         return  await this.authservice.newPasswordLogin(newCredential)
        }catch(error){
            if(error instanceof BadRequestException){
                return {
                    statusCode: 400,
                    message: error.message
                 }
                
            } else if(error instanceof NotFoundException){
                return {
                    statusCode: 404,
                    message: error.message
                 }


            }else if (error instanceof UnauthorizedException){
                return {
                    statusCode: 401,
                    message: error.message
                 }

            } else {
                throw new HttpException("unexpected error" , HttpStatus.CONFLICT);
            }
        }
    }

   

    @Post("sigUp")
    async createUser(
        @Query("parentId") parentId: string,
        @Body() userRegister: CreateUserDto){
        try{
     return  this.authservice.sigUp(userRegister,parentId)
        }catch(error){
            if(error instanceof BadRequestException){
                const status = error.getStatus();
                return{
                    statusCode: status,
                    message: error.message
                }
            }
            else {
                throw new HttpException("unexpected error" , HttpStatus.BAD_REQUEST)
            }
         }
    }

}