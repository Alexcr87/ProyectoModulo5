import {
  BadRequestException,
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  NotFoundException,
  Post,
  Query,
  Req,
  Res,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { ApiQuery, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.services';
import {
  CredentialUserDto,
  newChangePasswordDto,
} from 'src/dto/credentialUserDto';
import { CreateUserDto } from 'src/dto/createUserDto';
//import { AllowedUserIds } from "src/roles/roles.decorator";
import { AuthGuard } from 'src/Guards/auth.guard';
import { RolesGuard } from 'src/Guards/roles.guard';
import { Request, Response } from 'express';

import { requiresAuth } from 'express-openid-connect';
import { CreateUserDtoByAuth0 } from 'src/dto/createUserByAuth0Dto';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authservice: AuthService) {}

  @Post('sigIn')
  async sigIn(@Body() login: CredentialUserDto) {
   
      return await this.authservice.sigIn(login);

  }

  @Post('newPasswordChange')
  async newPasswordUser(@Body() newCredential: newChangePasswordDto) {
    console.log (newCredential);
    
    return await this.authservice.newPasswordLogin(newCredential);
  
    }

  

  @Post('sigUp')
  @ApiQuery({
    name: 'parentId',
    required: false,
    description: 'ID principal opcional para filtrar usuarios',
  })
  async createUser(
    @Query('parentId') parentId: string,
    @Body() userRegister: CreateUserDto,
  ) {
     return await this.authservice.sigUp(userRegister, parentId);
  }


  @Get('protected')
  userby(@Req() req: Request) {
    return JSON.stringify(req.oidc.user);
  }

  @Get('profile')
  async userByAuth(
    @Req() req: Request,
  ): Promise<CreateUserDtoByAuth0 | string> {
    const user = req.oidc.user;

    if (!user) {
      throw new BadRequestException('Usuario no encontrado en la solicitud');
    }

    if (!user.email) {
      throw new BadRequestException('Correo electrónico no encontrado en la solicitud');
    }

    const newUser: Partial<CreateUserDtoByAuth0> = {
      email: user.email,
      name: user.name,
      dni: 5487748,
      password: 'google',
    };
    console.log(newUser, 'controller');

    return this.authservice.createUserByAuth0(newUser);
  }
}
