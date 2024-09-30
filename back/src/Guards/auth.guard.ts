import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly jwtServices: JwtService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const authorizationHeader = request.headers['authorization'];
    if (!authorizationHeader) {
      throw new UnauthorizedException('Authorization header missing');
    }

    const [scheme, token] = authorizationHeader.split(' ');

    if (scheme !== 'Bearer' || !token) {
      throw new UnauthorizedException('Bearer or token not found');
    }
    try {
      const secret = process.env.JWT_SECRET;
      const payLoad = await this.jwtServices.verifyAsync(token, {
        secret: secret,
      });
      payLoad.iat = new Date(payLoad.iat * 1000);
      payLoad.exp = new Date(payLoad.exp * 1000);
      request.user = payLoad;
      return true;
    } catch (err) {
      throw new UnauthorizedException('Token invalid');
    }
  }
}
