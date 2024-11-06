import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsOptional, IsString } from "class-validator";
import { FileSystemStoredFile, HasMimeType, IsFile } from "nestjs-form-data";

export class CreateFileMessageDto {
    @ApiProperty({description: 'Texto del mensaje', example: "Hola"})
    @IsString()
    @IsOptional()
    text: string;

    @ApiProperty()
    @IsFile()
    @HasMimeType(['image/jpeg', 'image/png', "application/pdf"])
    @IsNotEmpty()
    file: FileSystemStoredFile;
}
