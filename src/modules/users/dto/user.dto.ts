import { IsEmail, IsNotEmpty, IsString} from 'class-validator';
import { ApiProperty } from "@nestjs/swagger";
import { Schema } from 'mongoose';

export class UserDto{
    @ApiProperty({description: 'id del usuario', example: "asdasdasdasdq2w"})
    @IsString()
    @IsNotEmpty()
    _id: string | unknown;

    @ApiProperty({description: 'nombre del usuario', example: "daniel"})
    @IsString()
    @IsNotEmpty()
    name: string;

    @ApiProperty({description: 'correo del usuario', example: "devone@email.com"})
    @IsEmail()
    @IsNotEmpty()
    email: string;
}