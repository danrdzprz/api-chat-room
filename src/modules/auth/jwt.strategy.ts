import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { JWTPayload } from './dto/jwt.payload';
import { UserRepository } from '../users/user.repository';
import { UserDto } from '../users/dto/user.dto';
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private user_repository: UserRepository) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET,
    });
  }

  async validate(payload: JWTPayload): Promise<UserDto> {
    const user = await this.user_repository.detail(payload.user_id);
    if (!user) {
      throw new UnauthorizedException("Es necesario estar autenticado para esta acción.");
    }
    return user;
  }
}