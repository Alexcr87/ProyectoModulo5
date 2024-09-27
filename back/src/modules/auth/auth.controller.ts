import { BadRequestException, Body, Controller, Get, HttpException, HttpStatus, NotFoundException, Post, Query, Req, Res, UnauthorizedException, UseGuards } from "@nestjs/common";
import { ApiQuery, ApiTags } from "@nestjs/swagger";
import { AuthService } from "./auth.services";
import { CredentialUserDto, newChangePasswordDto } from "src/dto/credentialUserDto";
import { CreateUserDto } from "src/dto/createUserDto";
//import { AllowedUserIds } from "src/roles/roles.decorator";
import { AuthGuard } from "src/Guards/auth.guard";
import { RolesGuard } from "src/Guards/roles.guard";
import { Request, Response } from "express";

import { Auth0Guard } from "src/Guards/auth0.guard";
import { requiresAuth } from "express-openid-connect";



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
    @ApiQuery({ name: 'parentId', required: false, description: 'Optional parent ID to filter users' })
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

    @Get('logout')
  logout(@Res() res: Response) {
    const logoutUrl = `https://dev-xk4piwty04btc53j.us.auth0.com/v2/logout?client_id=g9sKo4CvuWqmz3614QAgfv3EDMvCSBOQ&returnTo=http://localhost:3000/api`;
    res.redirect(logoutUrl);

}

@Get('login')
login(@Res() res: Response) {
  const auth0LoginUrl = `https://dev-xk4piwty04btc53j.us.auth0.com/authorize?response_type=code&client_id=g9sKo4CvuWqmz3614QAgfv3EDMvCSBOQ&redirect_uri=http://localhost:3000/callback&scope=openid profile email`;

  // Redirigir al usuario a la página de login de Auth0
  res.redirect(auth0LoginUrl);
}



@Get('profile')
@UseGuards(Auth0Guard) // Usa tu guardia personalizado
getProfile(@Req() req: Request, @Res() res: Response) {
    // Aquí usamos el middleware de express-openid-connect para acceder al usuario
    res.send(JSON.stringify(req.oidc.user));
}

}