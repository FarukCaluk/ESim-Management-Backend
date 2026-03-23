import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    const secret = process.env.SUPER_SECRET_KEY;
    if (!secret) {
      throw new Error(
        'SUPER_SECRET_KEY is not defined in environment variables'
      );
    }
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: secret,
    });
  }

  async validate(payload: any) {
    console.log('JwtStrategy validate payload:', payload);
    return { email: payload.sub, role: payload.role };
  }
}
