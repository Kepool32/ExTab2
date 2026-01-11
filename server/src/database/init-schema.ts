import { DataSource } from 'typeorm';
import { config } from 'dotenv';
import { Vacancy } from '@vacancies/entities/vacancy.entity';
import { Favorite } from '@favorites/entities/favorite.entity';

const envFile = process.env.NODE_ENV === 'production' ? '.env.production' : '.env.development';
config({ path: envFile, override: false });

const dataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT || '5432', 10),
  username: process.env.DB_USERNAME || 'postgres',
  password: process.env.DB_PASSWORD || 'postgres',
  database: process.env.DB_DATABASE || 'vacancies_db',
  entities: [Vacancy, Favorite],
  synchronize: true,
});

export async function initializeSchema() {
  let initialized = false;
  try {
    if (!dataSource.isInitialized) {
      await dataSource.initialize();
      initialized = true;
      console.log('✅ Database connection established');
    }

    await dataSource.synchronize(false);
    console.log('✅ Database schema synchronized (tables created/updated)');

    if (initialized) {
      await dataSource.destroy();
    }
  } catch (error) {
    console.error('❌ Error initializing database schema:', error.message);
    if (initialized && dataSource.isInitialized) {
      await dataSource.destroy();
    }
    throw error;
  }
}

if (require.main === module) {
  initializeSchema()
    .then(() => {
      console.log('✅ Done!');
      process.exit(0);
    })
    .catch((error) => {
      console.error('❌ Critical error:', error);
      process.exit(1);
    });
}
