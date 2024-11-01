import { Injectable, NotFoundException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { JWTPayload } from './dto/jwt.payload';
import { UserRepository } from '../users/user.repository';
import { UserDocument } from 'src/schemas/user.schema';
@Injectable()
export class AuthService {
  constructor(
    private user_repository: UserRepository,
    private jwtService: JwtService
  ) {}

  async validateUser(email: string, password: string): Promise<boolean> {
    const user : UserDocument = await this.user_repository.getByEmail(email);
    if(!user){
      throw new NotFoundException('Este usuario no existe');
    }
    return await user.validatePassword(password);
  }

  async generateAccessToken(email: string) {
    const user = await this.user_repository.getByEmail(email);
    if(!user){
      throw new NotFoundException('Este usuario no existe');
    }
    const payload: JWTPayload = { user_id: user._id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}