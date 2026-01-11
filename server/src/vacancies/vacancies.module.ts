import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VacanciesService } from '@vacancies/vacancies.service';
import { VacanciesController } from '@vacancies/vacancies.controller';
import { Vacancy } from '@vacancies/entities/vacancy.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Vacancy])],
  controllers: [VacanciesController],
  providers: [VacanciesService],
  exports: [VacanciesService],
})
export class VacanciesModule {}
