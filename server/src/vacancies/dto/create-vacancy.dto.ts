import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsOptional, MaxLength, MinLength, ValidateIf } from 'class-validator';

export class CreateVacancyDto {
  @ApiProperty({
    example: 'Senior Frontend Developer',
    description: 'Vacancy title',
    maxLength: 255,
  })
  @IsString({ message: 'Title must be a string' })
  @IsNotEmpty({ message: 'Title cannot be empty' })
  @MinLength(1, { message: 'Title cannot be empty' })
  @MaxLength(255, { message: 'Title must not exceed 255 characters' })
  title: string;

  @ApiProperty({
    example: 'We are looking for an experienced Frontend developer to work on modern web applications.',
    description: 'Detailed vacancy description',
  })
  @IsString({ message: 'Description must be a string' })
  @IsNotEmpty({ message: 'Description cannot be empty' })
  @MinLength(1, { message: 'Description cannot be empty' })
  description: string;

  @ApiProperty({
    example: 'Moscow',
    description: 'Location (city, work format)',
    required: false,
  })
  @IsOptional()
  @ValidateIf((o) => o.location !== undefined && o.location !== null)
  @IsString({ message: 'Location must be a string' })
  @IsNotEmpty({ message: 'Location cannot be empty if provided' })
  @MinLength(1, { message: 'Location cannot be empty if provided' })
  @MaxLength(255, { message: 'Location must not exceed 255 characters' })
  location?: string;

  @ApiProperty({
    example: '200000 - 350000',
    description: 'Salary (range or fixed amount)',
    required: false,
  })
  @IsOptional()
  @ValidateIf((o) => o.salary !== undefined && o.salary !== null)
  @IsString({ message: 'Salary must be a string' })
  @IsNotEmpty({ message: 'Salary cannot be empty if provided' })
  @MinLength(1, { message: 'Salary cannot be empty if provided' })
  @MaxLength(100, { message: 'Salary must not exceed 100 characters' })
  salary?: string;

  @ApiProperty({
    example: '5+ years of experience, deep knowledge of React, TypeScript',
    description: 'Candidate requirements',
    required: false,
  })
  @IsOptional()
  @ValidateIf((o) => o.requirements !== undefined && o.requirements !== null)
  @IsString({ message: 'Requirements must be a string' })
  @IsNotEmpty({ message: 'Requirements cannot be empty if provided' })
  @MinLength(1, { message: 'Requirements cannot be empty if provided' })
  requirements?: string;

  @ApiProperty({
    example: 'React, TypeScript, Redux, GraphQL, Jest, Webpack',
    description: 'Required skills and technologies (comma-separated)',
    required: false,
  })
  @IsOptional()
  @ValidateIf((o) => o.skills !== undefined && o.skills !== null)
  @IsString({ message: 'Skills must be a string' })
  @IsNotEmpty({ message: 'Skills cannot be empty if provided' })
  @MinLength(1, { message: 'Skills cannot be empty if provided' })
  @MaxLength(500, { message: 'Skills must not exceed 500 characters' })
  skills?: string;

  @ApiProperty({
    example: 'Full-time',
    description: 'Employment type (Full-time, Part-time, Remote, etc.)',
    required: false,
  })
  @IsOptional()
  @ValidateIf((o) => o.employmentType !== undefined && o.employmentType !== null)
  @IsString({ message: 'Employment type must be a string' })
  @IsNotEmpty({ message: 'Employment type cannot be empty if provided' })
  @MinLength(1, { message: 'Employment type cannot be empty if provided' })
  @MaxLength(100, { message: 'Employment type must not exceed 100 characters' })
  employmentType?: string;

  @ApiProperty({
    example: 'IT, Development',
    description: 'Vacancy category',
    required: false,
  })
  @IsOptional()
  @ValidateIf((o) => o.category !== undefined && o.category !== null)
  @IsString({ message: 'Category must be a string' })
  @IsNotEmpty({ message: 'Category cannot be empty if provided' })
  @MinLength(1, { message: 'Category cannot be empty if provided' })
  @MaxLength(100, { message: 'Category must not exceed 100 characters' })
  category?: string;
}
