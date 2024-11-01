import { IsString} from 'class-validator';
import { ApiProperty } from "@nestjs/swagger";
import { HttpStatus } from '@nestjs/common';


export class BadRequestException {
    @ApiProperty({description: 'Código de error', example: 400})
    @IsString()
    statusCode: HttpStatus;
    @ApiProperty({description: 'mensaje', example: "Unexpected token } in JSON at position 24"})
    @IsString()
    message: string;
    @ApiProperty({description: 'tipo de error', example: "Bad Request"})
    @IsString()
    error: string;
 }