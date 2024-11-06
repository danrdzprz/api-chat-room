import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsOptional, IsString } from "class-validator";
import { FileSystemStoredFile, HasMimeType, IsFile } from "nestjs-form-data";
import { NotStoredFile } from "src/common/helpers/not-storage.type";

export class CreateFileMessageDto {
    @ApiProperty({description: 'Texto del mensaje', example: "Hola"})
    @IsString()
    @IsOptional()
    text: string;

    @ApiProperty()
    @IsFile()
    @HasMimeType(['image/jpeg', 'image/png', "application/pdf"])
    @IsNotEmpty()
    file: NotStoredFile;
}
