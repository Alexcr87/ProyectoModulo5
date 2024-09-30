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
    try {
      return await this.authservice.sigIn(login);
    } catch (error) {
      if (error instanceof NotFoundException) {
        const status = error.getStatus();
        return {
          statusCode: status,
          message: error.message,
        };
      } else if (error instanceof UnauthorizedException) {
        return {
          statusCode: 401,
          message: error.message,
        };
      } else if (error instanceof BadRequestException) {
        return {
          statusCode: 400,
          message: error.message,
        };
      } else {
        throw new HttpException('unexpected error', HttpStatus.CONFLICT);
      }
    }
  }

  @Post('newPasswordChange')
  async newPasswordUser(@Body() newCredential: newChangePasswordDto) {
    console.log (newCredential);
    try {
      return await this.authservice.newPasswordLogin(newCredential);
    } catch (error) {
      if (error instanceof BadRequestException) {
        return {
          statusCode: 400,
          message: error.message,
        };
      } else if (error instanceof NotFoundException) {
        return {
          statusCode: 404,
          message: error.message,
        };
      } else if (error instanceof UnauthorizedException) {
        return {
          statusCode: 401,
          message: error.message,
        };
      } else {
        throw new HttpException('unexpected error', HttpStatus.CONFLICT);
      }
    }
  }

  @Post('sigUp')
  @ApiQuery({
    name: 'parentId',
    required: false,
    description: 'Optional parent ID to filter users',
  })
  async createUser(
    @Query('parentId') parentId: string,
    @Body() userRegister: CreateUserDto,
  ) {
    try {
      return this.authservice.sigUp(userRegister, parentId);
    } catch (error) {
      if (error instanceof BadRequestException) {
        const status = error.getStatus();
        return {
          statusCode: status,
          message: error.message,
        };
      } else {
        throw new HttpException('unexpected error', HttpStatus.BAD_REQUEST);
      }
    }
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
      throw new BadRequestException('User not found in request');
    }

    if (!user.email) {
      throw new BadRequestException('Email not found in request');
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
