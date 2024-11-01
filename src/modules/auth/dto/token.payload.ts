import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class TokenDto {
  @ApiProperty({description: 'token del usuario', example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiNjMzMzJlZDVjYzQ4YzhkMmFiMWViOGY3IiwiaWF0IjoxNjY0MzAyOTA4LCJleHAiOjE2NjQ0NzU3MDh9.D-8Fva_WTtiVJY6u6WqoEZfdM32b_a0cPdXfXb7BVZM"})
  @IsString()
  access_token: string;
}