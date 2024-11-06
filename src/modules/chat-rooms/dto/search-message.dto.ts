import { IsString } from 'class-validator';

export class SearchMessageDto {
    @IsString()
    text: string;
}
