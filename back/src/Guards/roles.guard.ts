import { CanActivate, ExecutionContext, ForbiddenException, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";



@Injectable()
export class RolesGuard implements CanActivate {
    constructor(private readonly reflector: Reflector) {}

    canActivate(context: ExecutionContext): boolean {
        const request = context.switchToHttp().getRequest();
        const user = request.user;
    
    
        const allowedUserIds = this.reflector.get<number[]>('allowedUserIds', context.getHandler()) || [];
        
        if (!user || !allowedUserIds.includes(user.id)) {
            throw new ForbiddenException("You don't have permission to access this route");
        }
    
        const hasRole = user.roles && user.roles.some(role => allowedUserIds.includes(role));
        
        if (!hasRole) {
            throw new ForbiddenException("You don't have access to this route");
        }
    
        return true;
}
}
