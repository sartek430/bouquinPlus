import { IsArray, IsOptional, IsString } from 'class-validator';

export class FilterDto {
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  editor: string[];
  
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  category: string[];
  
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  subCategory: string[];
}
