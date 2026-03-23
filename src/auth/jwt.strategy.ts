import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UsersService } from '../admin/users/users.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly usersService: UsersService) {
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
    const email = payload.email ?? payload.sub;
    if (!email) {
      throw new UnauthorizedException('Invalid token payload: missing email');
    }

    const user = await this.usersService.findByEmail(email);
    if (!user) {
      throw new UnauthorizedException('User not found');
    }

    return {
      id: user.id,
      email: user.email,
      role: payload.role ?? user.type,
      name: user.name,
    };
  }
}
