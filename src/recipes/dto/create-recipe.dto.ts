import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString, MinLength } from 'class-validator';

export class CreateRecipeDto {
  @ApiProperty()
  @IsString()
  @MinLength(1)
  title: string;

  @ApiProperty()
  @IsString()
  @MinLength(1)
  mainTitle: string;

  @ApiProperty()
  @IsString()
  @MinLength(1)
  portion_size: string;

  @ApiProperty()
  @IsString()
  @MinLength(1)
  preparation_minutes: string;

  @ApiProperty()
  @IsString()
  @MinLength(1)
  difficulty: string;

  @ApiPropertyOptional()
  @IsString()
  @MinLength(1)
  @IsOptional()
  score: string;

  @ApiProperty()
  @IsString()
  @MinLength(1)
  category: string;

  @ApiProperty()
  @IsString()
  @MinLength(1)
  favorite: boolean;

  @ApiPropertyOptional()
  @IsString()
  @MinLength(1)
  @IsOptional()
  image: string;
}
