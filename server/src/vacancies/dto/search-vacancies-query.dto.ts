import { ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsOptional, IsString, IsInt, Min, Max, MinLength, MaxLength } from 'class-validator';

export class SearchVacanciesQueryDto {
  @ApiPropertyOptional({
    description: 'Search query to filter vacancies by title (case-insensitive)',
    example: 'Frontend Developer',
    maxLength: 255,
  })
  @IsOptional()
  @IsString({ message: 'Keyword must be a string' })
  @MinLength(1, { message: 'Keyword cannot be empty if provided' })
  @MaxLength(255, { message: 'Keyword must not exceed 255 characters' })
  keyword?: string;

  @ApiPropertyOptional({
    description: 'Page number for pagination',
    example: 1,
    minimum: 1,
    default: 1,
    type: Number,
  })
  @IsOptional()
  @Type(() => Number)
  @IsInt({ message: 'Page must be an integer' })
  @Min(1, { message: 'Page must be a positive number' })
  page?: number = 1;

  @ApiPropertyOptional({
    description: 'Number of items per page',
    example: 4,
    minimum: 1,
    maximum: 100,
    default: 4,
    type: Number,
  })
  @IsOptional()
  @Type(() => Number)
  @IsInt({ message: 'Limit must be an integer' })
  @Min(1, { message: 'Limit must be a positive number' })
  @Max(100, { message: 'Limit must not exceed 100 items per page' })
  limit?: number = 4;
}
