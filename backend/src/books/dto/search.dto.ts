import { IsNotEmpty, IsString } from 'class-validator';

export class SearchDto {
  @IsNotEmpty()
  @IsString()
  text: string;
}
