import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Request } from 'express';

@Injectable()
export class Auth0Guard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request: Request = context.switchToHttp().getRequest();
    
    // Verifica si el usuario está autenticado a través de Auth0
    return !!request.oidc?.user;
  }
}