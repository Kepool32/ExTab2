import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, ILike } from 'typeorm';
import { Vacancy } from '@vacancies/entities/vacancy.entity';
import { CreateVacancyDto } from '@vacancies/dto/create-vacancy.dto';
import { SearchVacanciesQueryDto } from '@vacancies/dto/search-vacancies-query.dto';
import { PaginationDto } from '@vacancies/dto/pagination.dto';

@Injectable()
export class VacanciesService {
  constructor(
    @InjectRepository(Vacancy)
    private readonly vacancyRepository: Repository<Vacancy>,
  ) {}

  async findAll(paginationDto?: PaginationDto) {
    const { page = 1, limit = 4 } = paginationDto || {};
    const skip = (page - 1) * limit;

    const [items, totalItems] = await this.vacancyRepository.findAndCount({
      order: { createdAt: 'DESC' },
      take: limit,
      skip,
    });

    const totalPages = Math.ceil(totalItems / limit);

    return {
      items,
      meta: {
        totalItems,
        itemCount: items.length,
        itemsPerPage: limit,
        totalPages,
        currentPage: page,
      },
    };
  }

  async findOne(id: number): Promise<Vacancy> {
    const vacancy = await this.vacancyRepository.findOne({ where: { id } });
    if (!vacancy) {
      throw new NotFoundException(`Vacancy with ID ${id} not found`);
    }
    return vacancy;
  }

  async create(createVacancyDto: CreateVacancyDto): Promise<Vacancy> {
    const vacancy = this.vacancyRepository.create(createVacancyDto);
    return this.vacancyRepository.save(vacancy);
  }

  async remove(id: number): Promise<void> {
    const vacancy = await this.findOne(id);
    await this.vacancyRepository.remove(vacancy);
  }

  async search(searchDto: SearchVacanciesQueryDto) {
    const { keyword, page = 1, limit = 4 } = searchDto;
    const skip = (page - 1) * limit;

    const where = keyword
      ? { title: ILike(`%${keyword}%`) }
      : {};

    const [items, totalItems] = await this.vacancyRepository.findAndCount({
      where,
      order: { createdAt: 'DESC' },
      take: limit,
      skip,
    });

    const totalPages = Math.ceil(totalItems / limit);

    return {
      items,
      meta: {
        totalItems,
        itemCount: items.length,
        itemsPerPage: limit,
        totalPages,
        currentPage: page,
      },
    };
  }
}
