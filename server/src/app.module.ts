import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { VacanciesModule } from '@vacancies/vacancies.module';
import { FavoritesModule } from '@favorites/favorites.module';
import { Vacancy } from '@vacancies/entities/vacancy.entity';
import { Favorite } from '@favorites/entities/favorite.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: process.env.NODE_ENV === 'production' ? '.env.production' : '.env.development',
      ignoreEnvFile: false,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('DB_HOST', 'localhost'),
        port: configService.get('DB_PORT', 5432),
        username: configService.get('DB_USERNAME', 'postgres'),
        password: configService.get('DB_PASSWORD', 'postgres'),
        database: configService.get('DB_DATABASE', 'vacancies_db'),
        entities: [Vacancy, Favorite],
        synchronize: configService.get('NODE_ENV') !== 'production',
        autoLoadEntities: true,
        logging: configService.get('NODE_ENV') === 'development',
      }),
    }),
    VacanciesModule,
    FavoritesModule,
  ],
})
export class AppModule {}
