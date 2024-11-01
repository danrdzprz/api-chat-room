import { HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { JWTPayload } from './dto/jwt.payload';
import { UserRepository } from '../users/user.repository';
import { UserDocument } from 'src/schemas/user.schema';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { DefaultException } from 'src/common/utils/default-error-dto';
import { DefaultResponse } from 'src/common/utils/default-response.dto';
import { UserDto } from '../users/dto/user.dto';
import { I18nService } from 'nestjs-i18n';
@Injectable()
export class AuthService {
  constructor(
    private user_repository: UserRepository,
    private jwtService: JwtService,
    private readonly i18n: I18nService,
  ) {}

  async validateUser(email: string, password: string): Promise<boolean> {
    const user : UserDocument = await this.user_repository.getByEmail(email);
    if(!user){
      throw new NotFoundException('Este usuario no existe');
    }
    return await user.validatePassword(password);
  }

  async register(data: CreateUserDto): Promise<DefaultResponse>{
    const new_user = await this.user_repository.store(data);
    if(new_user){
      return { message: this.i18n.t('modules.auth.register.success') };
    }else{
      return { message: this.i18n.t('modules.common.controller_error') }
    }
  }

  async getById(id: string): Promise<UserDto>{
    return await this.user_repository.detail(id);
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