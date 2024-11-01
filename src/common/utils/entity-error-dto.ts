import { IsObject, IsString} from 'class-validator';
import { ApiProperty } from "@nestjs/swagger";
import { HttpStatus } from '@nestjs/common';


export class EnityException {
    @ApiProperty({description: 'Código de error', example: 422})
    @IsString()
    statusCode: HttpStatus;
    @ApiProperty({description: 'mensaje', example: {"param_one": [
        "param_one should not be empty"
    ],
    "param_two": [
        "param_two should not be empty"
    ],
    "param_three": [
        "param_three should not be empty"
    ]}})
    @IsObject()
    message: object;
    @ApiProperty({description: 'tipo de error', example: "Unprocessable entity"})
    @IsString()
    error: string;
 }