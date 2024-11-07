import { IsEmail, IsNotEmpty, IsString, MinLength, Validate} from 'class-validator';
import { ApiProperty } from "@nestjs/swagger";
import { Unique } from 'src/common/helpers/custom-validations/Unique.validation';
import { UniqueValidator } from 'src/common/helpers/custom-validations/rules/UniqueRule';

export class CreateUserDto {
    @ApiProperty({description: 'nombre del producto', example: "Daniel"})
    @IsString()
    @IsNotEmpty()
    name: string;

    @ApiProperty({description: 'correo del producto', example: "devone@email.com"})
    @IsEmail()
    @IsNotEmpty()
    @Validate(UniqueValidator, ['email'])
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