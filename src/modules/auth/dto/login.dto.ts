{description: 'nombre del producto'}import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsEmail } from 'class-validator';

export class LoginDTO {
  @ApiProperty({description: 'email del usuario', example: "daniel"})
  @IsString()
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty({description: 'password del usuario', example: "secret"})
  @IsString()
  @IsNotEmpty()
  password: string;
}