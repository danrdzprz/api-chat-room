import { IsString} from 'class-validator';
import { ApiProperty } from "@nestjs/swagger";
import { HttpStatus } from '@nestjs/common';


export class DefaultException {
    @ApiProperty({description: 'Código de error', example: 401})
    @IsString()
    statusCode: HttpStatus;
    @ApiProperty({description: 'mensaje', example: "No tienes permisos"})
    @IsString()
    message: string;
    @ApiProperty({description: 'tipo de error', example: "Unauthorized"})
    @IsString()
    error: string;
 }