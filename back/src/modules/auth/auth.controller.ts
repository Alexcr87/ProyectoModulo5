import { Body, Controller, Post } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { AuthService } from "./auth.services";
import { CredentialUserDto } from "src/dto/credentialUserDto";
import { CreateUserDto } from "src/dto/createUserDto";


@ApiTags("Auth")
@Controller("auth")
export class AuthController {
    constructor( private readonly authservice: AuthService ){}

    @Post("sigIn")
    async sigIn (@Body() login: CredentialUserDto) {
        try {
     return await this.authservice.sigIn(login)
        } catch(error){

        }
    }
    @Post("newPasswordChange")
    async newPasswordUser (@Body() )

    @Post("sigUp")
    async sigUp (@Body() userRegister:CreateUserDto){
        try{
     return await this.authservice.sigUp(userRegister)
        }catch(error){

        }
    }

}