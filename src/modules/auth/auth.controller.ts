import { Body, Controller, Post, UnauthorizedException, Get, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDTO } from './dto/login.dto';
import { UserPayload } from './dto/user.payload';
import { CreateUserDto } from '../users/dto/create-user.dto';
// import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { Auth } from './auth.decorator'
import { AllowUnauthorizedRequest } from '../../common/helpers/decorators/no-auth.decorator';
import { TokenDto } from './dto/token.payload';
import { UserDto } from '../users/dto/user.dto';
import { AuthException } from '../../common/utils/auth-error-dto';
import { DefaultResponse } from 'src/common/utils/default-response.dto';

@Controller('/')
// @UseGuards(AuthGuard('jwt'))
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  @ApiOperation({ summary: 'Endpoint para el login por medio de un correo y un password.' })
  @ApiResponse({
    status:201,
    description: 'Token para obtener acceso.',
    type: TokenDto
  })
  @ApiUnauthorizedResponse({ type: () => AuthException })
  @AllowUnauthorizedRequest()
  async login(@Body() loginDTO: LoginDTO): Promise<TokenDto> {
    const { email, password } = loginDTO;
    const valid = await this.authService.validateUser(email, password);
    if (!valid) {
      throw new UnauthorizedException("Usuario o contraseña incorrecta.");
    }
    return await this.authService.generateAccessToken(email);
  }

  @Post('register')
  @ApiOperation({ summary: 'Endpoint para el login por medio de un correo y un password.' })
  @ApiResponse({
    status:201,
    description: 'Token para obtener acceso.',
    type: TokenDto
  })
  @ApiUnauthorizedResponse({ type: () => AuthException })
  @AllowUnauthorizedRequest()
  async register(@Body() data: CreateUserDto): Promise<DefaultResponse> {
    return await this.authService.register(data);
  }

  @Get('me')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Retorna el usuario de la sesión.' })
  @ApiResponse({
    status:201,
    type: UserDto
  })
  @ApiUnauthorizedResponse({ type: () => AuthException })
  async getUserById(@Auth() { id }: UserPayload): Promise<UserDto> {
    return await this.authService.getById(id);
  }

}