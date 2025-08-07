import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

import * as config from 'config';

const secretKey = config.get<string>('secretKey.secret');

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private jwtService: JwtService, private configService: ConfigService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const authHeader = request.headers['authorization'];

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new UnauthorizedException('Missing or invalid token');
    }
    
    const token = authHeader.split(' ')[1];
    try {
      const payload = await this.jwtService.verifyAsync(token, {
        secret: secretKey,

      });
      
      // request.user = payload;

      request.user = {
    id: payload.sub, // Ensure consistent field name
    email: payload.email,
    role: payload.role
  };
  
      return true;
    } catch {
      throw new UnauthorizedException('Invalid or expired token');
    }
  }
}
