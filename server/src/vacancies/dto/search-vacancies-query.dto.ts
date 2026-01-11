import { ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsOptional, IsString, IsInt, Min, MinLength } from 'class-validator';

export class SearchVacanciesQueryDto {
  @ApiPropertyOptional({
    description: 'Search query to filter vacancies by title (case-insensitive)',
    example: 'Frontend Developer',
  })
  @IsOptional()
  @IsString({ message: 'Keyword must be a string' })
  @MinLength(1, { message: 'Keyword cannot be empty if provided' })
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
  @IsInt()
  @Min(1)
  page?: number = 1;

  @ApiPropertyOptional({
    description: 'Number of items per page',
    example: 4,
    minimum: 1,
    default: 4,
    type: Number,
  })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  limit?: number = 4;
}
