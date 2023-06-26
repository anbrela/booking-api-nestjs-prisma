import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { JwtPayload } from './auth/interfaces/jwt-payload.interface';
import { AuthRepository } from './auth/auth.repository';
import { User } from '@prisma/client';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private authRepository: AuthRepository) {
    super({
      secretOrKey: process.env.JWT_SECRET,
      ignoreExpiration: false,
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    });
  }

  async validate(payload: JwtPayload): Promise<User> {
    const { email } = payload;
    const user = await this.authRepository.findByEmail(email);
    if (!user) {
      throw new UnauthorizedException();
    }

    return user;
  }
}
