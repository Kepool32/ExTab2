import { DataSource } from 'typeorm';
import { config } from 'dotenv';

const envFile = process.env.NODE_ENV === 'production' ? '.env.production' : '.env.development';
config({ path: envFile, override: false });

async function createDatabaseIfNotExists() {
  const dbName = process.env.DB_DATABASE || 'vacancies_db';
  const dbHost = process.env.DB_HOST || 'localhost';
  const dbPort = parseInt(process.env.DB_PORT || '5432', 10);
  const dbUsername = process.env.DB_USERNAME || 'postgres';
  const dbPassword = process.env.DB_PASSWORD || 'postgres';

  const adminDataSource = new DataSource({
    type: 'postgres',
    host: dbHost,
    port: dbPort,
    username: dbUsername,
    password: dbPassword,
    database: 'postgres',
  });

  try {
    await adminDataSource.initialize();
    console.log('✅ PostgreSQL connection established');

    const result = await adminDataSource.query(
      `SELECT 1 FROM pg_database WHERE datname = $1`,
      [dbName],
    );

    if (result.length === 0) {
      await adminDataSource.query(`CREATE DATABASE "${dbName}"`);
      console.log(`✅ Database "${dbName}" created successfully`);
    } else {
      console.log(`✅ Database "${dbName}" already exists`);
    }

    await adminDataSource.destroy();
  } catch (error) {
    console.error('❌ Error creating database:', error.message);
    if (adminDataSource.isInitialized) {
      await adminDataSource.destroy();
    }
    throw error;
  }
}

if (require.main === module) {
  createDatabaseIfNotExists()
    .then(() => {
      console.log('✅ Done!');
      process.exit(0);
    })
    .catch((error) => {
      console.error('❌ Critical error:', error);
      process.exit(1);
    });
}

export { createDatabaseIfNotExists };
