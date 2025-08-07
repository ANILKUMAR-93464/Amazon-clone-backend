import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import * as config from 'config';

const jwtConfig = config.get('secretKey.secret');

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: jwtConfig,
    });
  }

  async validate(payload: any) {
    return {
      sub: payload.sub || payload.id, // Handle both formats
      email: payload.email,
      role: payload.role,
    };
  }
}
