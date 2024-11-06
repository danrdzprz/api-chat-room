import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class CreateTextMessageDto {
    @ApiProperty({description: 'Texto del mensaje', example: "Hola"})
    @IsString()
    @IsNotEmpty()
    text: string;
}
