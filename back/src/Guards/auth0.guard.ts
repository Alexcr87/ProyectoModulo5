import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Request } from 'express';

@Injectable()
export class Auth0Guard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request: Request = context.switchToHttp().getRequest();
    // Aquí puedes verificar si el usuario está autenticado
    return !!(request.oidc && request.oidc.user);// Asegúrate de que el usuario esté presente
  }
}