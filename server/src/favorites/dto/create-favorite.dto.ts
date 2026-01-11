import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, Min } from 'class-validator';

export class CreateFavoriteDto {
  @ApiProperty({ example: 1, description: 'Vacancy ID to add to favorites' })
  @IsInt({ message: 'Vacancy ID must be an integer' })
  @IsNotEmpty({ message: 'Vacancy ID is required' })
  @Min(1, { message: 'Vacancy ID must be a positive number' })
  vacancyId: number;
}
