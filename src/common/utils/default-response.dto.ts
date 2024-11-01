import { IsString} from 'class-validator';
import { ApiProperty } from "@nestjs/swagger";

export class DefaultResponse {
    @ApiProperty({description: 'Mensaje de acción existosa', example: "la acción ha sido exitosa"})
    @IsString()
    message: string;
}