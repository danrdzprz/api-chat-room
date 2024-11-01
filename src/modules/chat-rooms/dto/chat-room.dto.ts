import { IsString } from 'class-validator';
import { ApiProperty } from "@nestjs/swagger";
import { UserDto } from '../../users/dto/user.dto';

export class ChatRoomDto {
    @ApiProperty({description: 'Nombre del producto.', example: "papas"})
    @IsString()
    name: string;

    @ApiProperty({description: 'Propietario.'})
    owner: UserDto;
}
