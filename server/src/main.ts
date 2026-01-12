import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from '@app/app.module';
import { createDatabaseIfNotExists } from '@database/create-database';
import { initializeSchema } from '@database/init-schema';

async function bootstrap() {
  try {
    console.log('Checking database existence...');
    await createDatabaseIfNotExists();

    console.log('Initializing database schema...');
    await initializeSchema();
  } catch (error) {
    console.error('Failed to initialize database automatically.');
    console.error('Ensure PostgreSQL is running and accessible.');
    console.error('Or create database and tables manually: npm run init-db');
  }

  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: process.env.CORS_ORIGIN || process.env.CLIENT_URL || 'http://localhost:5173',
    credentials: true,
  });

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      forbidNonWhitelisted: false,
      transformOptions: {
        enableImplicitConversion: true,
      },
      stopAtFirstError: false,
      disableErrorMessages: false,
    }),
  );

  const config = new DocumentBuilder()
    .setTitle('Vacancies API')
    .setDescription('API for managing vacancies and favorites')
    .setVersion('1.0')
    .addTag('vacancies', 'Vacancy operations')
    .addTag('favorites', 'Favorite operations')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document, {
    swaggerOptions: {
      persistAuthorization: true,
    },
  });

  const port = process.env.PORT || 3000;
  await app.listen(port);

  console.log(`🚀 Application is running on: http://localhost:${port}`);
  console.log(`📚 Swagger documentation: http://localhost:${port}/api`);
}

bootstrap();
