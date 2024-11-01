import { IsString } from 'class-validator';

export class UserPayload {
  @IsString()
  id: string;

}