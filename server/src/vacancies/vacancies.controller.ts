import { Controller, Get, Post, Delete, Body, Param, ParseIntPipe, HttpCode, HttpStatus, Query } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiBody, ApiQuery } from '@nestjs/swagger';
import { VacanciesService } from '@vacancies/vacancies.service';
import { Vacancy } from '@vacancies/entities/vacancy.entity';
import { CreateVacancyDto } from '@vacancies/dto/create-vacancy.dto';
import { SearchVacanciesQueryDto } from '@vacancies/dto/search-vacancies-query.dto';
import { PaginationDto } from '@vacancies/dto/pagination.dto';

@ApiTags('vacancies')
@Controller('vacancies')
export class VacanciesController {
  constructor(private readonly vacanciesService: VacanciesService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ 
    summary: 'Create a new vacancy',
    description: 'Adds a new vacancy to the database. Required fields: title, description. Other fields are optional.'
  })
  @ApiBody({ 
    type: CreateVacancyDto,
    description: 'New vacancy data',
    examples: {
      example1: {
        summary: 'Full vacancy',
        description: 'Example vacancy with all fields',
        value: {
          title: 'Senior Frontend Developer',
          description: 'We are looking for an experienced Frontend developer to work on modern web applications. You will work with React, TypeScript and modern development tools.',
          location: 'Moscow',
          salary: '200000 - 350000',
          requirements: '5+ years of experience, deep knowledge of React, TypeScript, experience with state management',
          skills: 'React, TypeScript, Redux, GraphQL, Jest, Webpack',
          employmentType: 'Full-time',
          category: 'IT, Development'
        }
      },
      example2: {
        summary: 'Minimal vacancy',
        description: 'Example vacancy with only required fields',
        value: {
          title: 'Junior Developer',
          description: 'We are looking for a junior developer to work in a friendly team.'
        }
      }
    }
  })
  @ApiResponse({ 
    status: 201, 
    description: 'Vacancy created successfully', 
    type: Vacancy 
  })
  @ApiResponse({ 
    status: 400, 
    description: 'Validation error. Check required fields and their format.' 
  })
  async create(@Body() createVacancyDto: CreateVacancyDto): Promise<Vacancy> {
    return this.vacanciesService.create(createVacancyDto);
  }

  @Get()
  @ApiOperation({ 
    summary: 'Get all vacancies with pagination',
    description: 'Returns paginated list of all vacancies ordered by creation date (newest first). No search functionality.'
  })
  @ApiQuery({ name: 'page', required: false, description: 'Page number (default: 1)', type: Number })
  @ApiQuery({ name: 'limit', required: false, description: 'Items per page (default: 4)', type: Number })
  @ApiResponse({ 
    status: 200, 
    description: 'Paginated list of vacancies',
    schema: {
      type: 'object',
      properties: {
        items: {
          type: 'array',
          items: { $ref: '#/components/schemas/Vacancy' }
        },
        meta: {
          type: 'object',
          properties: {
            totalItems: { type: 'number' },
            itemCount: { type: 'number' },
            itemsPerPage: { type: 'number' },
            totalPages: { type: 'number' },
            currentPage: { type: 'number' }
          }
        }
      }
    }
  })
  async findAll(@Query() paginationDto?: PaginationDto) {
    return this.vacanciesService.findAll(paginationDto);
  }

  @Get('search')
  @ApiOperation({ 
    summary: 'Search vacancies with case-insensitive search',
    description: 'Search vacancies by keyword in title (case-insensitive). Returns paginated results.'
  })
  @ApiQuery({ name: 'keyword', required: false, description: 'Search query (case-insensitive)', type: String })
  @ApiQuery({ name: 'page', required: false, description: 'Page number (default: 1)', type: Number })
  @ApiQuery({ name: 'limit', required: false, description: 'Items per page (default: 4)', type: Number })
  @ApiResponse({ 
    status: 200, 
    description: 'Paginated search results',
    schema: {
      type: 'object',
      properties: {
        items: {
          type: 'array',
          items: { $ref: '#/components/schemas/Vacancy' }
        },
        meta: {
          type: 'object',
          properties: {
            totalItems: { type: 'number' },
            itemCount: { type: 'number' },
            itemsPerPage: { type: 'number' },
            totalPages: { type: 'number' },
            currentPage: { type: 'number' }
          }
        }
      }
    }
  })
  async search(@Query() searchDto: SearchVacanciesQueryDto) {
    return this.vacanciesService.search(searchDto);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get vacancy by ID' })
  @ApiParam({ name: 'id', type: 'number', description: 'Vacancy ID' })
  @ApiResponse({ status: 200, description: 'Vacancy found', type: Vacancy })
  @ApiResponse({ status: 404, description: 'Vacancy not found' })
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<Vacancy> {
    return this.vacanciesService.findOne(id);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ 
    summary: 'Delete vacancy',
    description: 'Deletes a vacancy by ID. All related favorite records are also deleted.'
  })
  @ApiParam({ name: 'id', type: 'number', description: 'Vacancy ID to delete' })
  @ApiResponse({ 
    status: 204, 
    description: 'Vacancy deleted successfully' 
  })
  @ApiResponse({ 
    status: 404, 
    description: 'Vacancy not found' 
  })
  async remove(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.vacanciesService.remove(id);
  }
}
