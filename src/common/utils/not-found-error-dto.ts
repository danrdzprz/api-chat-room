import { IsString} from 'class-validator';
import { ApiProperty } from "@nestjs/swagger";
import { HttpStatus } from '@nestjs/common';


export class NotFoundException {
    @ApiProperty({description: 'Código de error', example: 404})
    @IsString()
    statusCode: HttpStatus;
    @ApiProperty({description: 'mensaje', example: "Este recurso no existe."})
    @IsString()
    message: string;
    @ApiProperty({description: 'tipo de error', example: "Not Found"})
    @IsString()
    error: string;
 }