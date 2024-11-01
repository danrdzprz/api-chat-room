import { IsNotEmpty, IsString, IsNumberString,IsOptional, IsArray, IsBooleanString} from 'class-validator';
import { ApiProperty } from "@nestjs/swagger";

export class PaginationOptions {
    @ApiProperty({description: 'Página', example: 1})
    @IsNumberString()
    @IsNotEmpty()
    page: string;

    @ApiProperty({description: 'Elementos por pagina', example: 10})
    @IsNumberString()
    @IsNotEmpty()
    itemsPerPage: string;
}