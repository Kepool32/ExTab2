import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Favorite } from '@favorites/entities/favorite.entity';
import { CreateFavoriteDto } from '@favorites/dto/create-favorite.dto';
import { VacanciesService } from '@vacancies/vacancies.service';

@Injectable()
export class FavoritesService {
  constructor(
    @InjectRepository(Favorite)
    private readonly favoriteRepository: Repository<Favorite>,
    private readonly vacanciesService: VacanciesService,
  ) {}

  async findAll(): Promise<Favorite[]> {
    return this.favoriteRepository.find({
      relations: ['vacancy'],
      order: { createdAt: 'DESC' },
    });
  }

  async create(createFavoriteDto: CreateFavoriteDto): Promise<Favorite> {
    await this.vacanciesService.findOne(createFavoriteDto.vacancyId);

    const existingFavorite = await this.favoriteRepository.findOne({
      where: { vacancyId: createFavoriteDto.vacancyId },
    });

    if (existingFavorite) {
      throw new ConflictException('Vacancy is already in favorites');
    }

    const favorite = this.favoriteRepository.create(createFavoriteDto);
    return this.favoriteRepository.save(favorite);
  }

  async remove(id: number): Promise<void> {
    const favorite = await this.favoriteRepository.findOne({ where: { id } });
    if (!favorite) {
      throw new NotFoundException(`Favorite record with ID ${id} not found`);
    }
    await this.favoriteRepository.remove(favorite);
  }
}
