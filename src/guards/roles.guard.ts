import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { JwtService } from "@nestjs/jwt";
import { Observable } from "rxjs";
import { ROLES_KEY } from "src/decorators/roles.decorator";
import * as request from 'supertest';


@Injectable()
export class RolesGuard implements CanActivate{
    constructor(private reflector: Reflector, private jwtService:JwtService){}


    canActivate(context: ExecutionContext): boolean{
        const requiredRoles = this.reflector.getAllAndOverride<string[]>(ROLES_KEY, [context.getHandler(), context.getClass()])
        
        if(!requiredRoles){
            return true;
        }

        const request = context.switchToHttp().getRequest()
        const user = request.user;
        return requiredRoles.includes(user?.role)
       
    }
}