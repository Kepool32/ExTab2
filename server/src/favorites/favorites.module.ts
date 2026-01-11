import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FavoritesService } from '@favorites/favorites.service';
import { FavoritesController } from '@favorites/favorites.controller';
import { Favorite } from '@favorites/entities/favorite.entity';
import { VacanciesModule } from '@vacancies/vacancies.module';

@Module({
  imports: [TypeOrmModule.forFeature([Favorite]), VacanciesModule],
  controllers: [FavoritesController],
  providers: [FavoritesService],
})
export class FavoritesModule {}
