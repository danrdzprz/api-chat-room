import { IsEmail, IsNotEmpty, IsString, MinLength} from 'class-validator';
import { ApiProperty } from "@nestjs/swagger";

export class CreateUserDto {
    @ApiProperty({description: 'nombre del producto', example: "daniel"})
    @IsString()
    @IsNotEmpty()
    name: string;

    @ApiProperty({description: 'correo del producto', example: "devone@email.com"})
    @IsEmail()
    @IsNotEmpty()
    email: string;

    @ApiProperty({description: 'contraseña del producto', example: "secret"})
    @IsString()
    @IsNotEmpty()
    @MinLength(8)
    password: string;

    @ApiProperty({description: 'contraseña del producto', example: "secret"})
    @IsString()
    @IsNotEmpty()
    @MinLength(8)
    password_confirmation: string;
}