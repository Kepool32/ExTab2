import { Controller, Get, Post, Delete, Body, Param, ParseIntPipe, HttpCode, HttpStatus } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiBody } from '@nestjs/swagger';
import { FavoritesService } from '@favorites/favorites.service';
import { CreateFavoriteDto } from '@favorites/dto/create-favorite.dto';
import { Favorite } from '@favorites/entities/favorite.entity';

@ApiTags('favorites')
@Controller('favorites')
export class FavoritesController {
  constructor(private readonly favoritesService: FavoritesService) {}

  @Get()
  @ApiOperation({ summary: 'Get all favorite vacancies' })
  @ApiResponse({ status: 200, description: 'List of favorite vacancies', type: [Favorite] })
  async findAll(): Promise<Favorite[]> {
    return this.favoritesService.findAll();
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Add vacancy to favorites' })
  @ApiBody({ type: CreateFavoriteDto })
  @ApiResponse({ status: 201, description: 'Vacancy added to favorites', type: Favorite })
  @ApiResponse({ status: 404, description: 'Vacancy not found' })
  @ApiResponse({ status: 409, description: 'Vacancy already in favorites' })
  async create(@Body() createFavoriteDto: CreateFavoriteDto): Promise<Favorite> {
    return this.favoritesService.create(createFavoriteDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Remove vacancy from favorites' })
  @ApiParam({ name: 'id', type: 'number', description: 'Favorite record ID' })
  @ApiResponse({ status: 204, description: 'Vacancy removed from favorites' })
  @ApiResponse({ status: 404, description: 'Favorite record not found' })
  async remove(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.favoritesService.remove(id);
  }
}
