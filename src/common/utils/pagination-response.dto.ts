import { IsEmail, IsNotEmpty, IsString} from 'class-validator';
import { ApiProperty } from "@nestjs/swagger";

export class PaginationResponse {
    @ApiProperty({description: 'lista', example: []})
    data: any[];

    @ApiProperty({description: 'total de elementos', example: 3})
    total: number;

    @ApiProperty({description: 'total de paginas', example: 1})
    total_pages: number;

    @ApiProperty({description: 'página actual', example: 1})
    current_page: number;

    @ApiProperty({description: 'página previa', example:1, nullable: true})
    previous_page: number|null;

    @ApiProperty({description: 'siguiente página', example:1, nullable: true})
    next_page: number |null ;
}