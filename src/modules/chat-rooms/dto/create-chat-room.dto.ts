import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class CreateChatRoomDto {
    @ApiProperty({description: 'Nombre del la sala de chat.', example: "chat 1"})
    @IsString()
    @IsNotEmpty()
    name: string;
}
