import { DataSource } from 'typeorm';
import { config } from 'dotenv';
import { Vacancy } from '@vacancies/entities/vacancy.entity';

const envFile = process.env.NODE_ENV === 'production' ? '.env.production' : '.env.development';
config({ path: envFile, override: false });

const dataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT || '5432', 10),
  username: process.env.DB_USERNAME || 'postgres',
  password: process.env.DB_PASSWORD || 'postgres',
  database: process.env.DB_DATABASE || 'vacancies_db',
  entities: [__dirname + '/../**/*.entity{.ts,.js}'],
  synchronize: true,
});

const vacancies = [
  {
    title: 'Senior Frontend Developer',
    description: 'We are looking for an experienced Frontend developer to work on modern web applications. You will work with React, TypeScript and modern development tools.',
    location: 'Moscow',
    salary: '200000 - 350000',
    requirements: '5+ years of experience, deep knowledge of React, TypeScript, experience with state management',
    skills: 'React, TypeScript, Redux, GraphQL, Jest, Webpack',
    employmentType: 'Full-time',
    category: 'IT, Development',
  },
  {
    title: 'Backend Developer (Node.js)',
    description: 'Development of server-side applications on Node.js and NestJS. Work with microservices architecture.',
    location: 'Saint Petersburg',
    salary: '180000 - 300000',
    requirements: '3+ years of experience with Node.js, knowledge of NestJS, experience with PostgreSQL, Redis',
    skills: 'Node.js, NestJS, PostgreSQL, Redis, Docker, TypeScript',
    employmentType: 'Full-time',
    category: 'IT, Development',
  },
  {
    title: 'Full Stack Developer',
    description: 'Full-cycle web application development from frontend to backend. Work in a dynamic team on interesting projects.',
    location: 'Kazan',
    salary: '150000 - 280000',
    requirements: '3+ years of experience, knowledge of React and Node.js, understanding of full development cycle',
    skills: 'React, Node.js, PostgreSQL, TypeScript, REST API, Git',
    employmentType: 'Full-time, Remote',
    category: 'IT, Development',
  },
  {
    title: 'DevOps Engineer',
    description: 'Infrastructure setup and maintenance, automation of development and deployment processes.',
    location: 'Moscow',
    salary: '220000 - 400000',
    requirements: '4+ years of experience, knowledge of Docker, Kubernetes, CI/CD, cloud platforms',
    skills: 'Docker, Kubernetes, AWS/Azure, CI/CD, Terraform, Ansible',
    employmentType: 'Full-time',
    category: 'IT, DevOps',
  },
  {
    title: 'React Developer',
    description: 'React user interface development. Work on improving user experience.',
    location: 'Novosibirsk',
    salary: '120000 - 220000',
    requirements: '2+ years of experience with React, knowledge of JavaScript/TypeScript, experience with REST API',
    skills: 'React, JavaScript, TypeScript, CSS, HTML, Redux Toolkit',
    employmentType: 'Full-time, Remote',
    category: 'IT, Development',
  },
  {
    title: 'QA Engineer',
    description: 'Web application testing, writing test cases, test automation.',
    location: 'Yekaterinburg',
    salary: '80000 - 150000',
    requirements: '1+ years of experience, knowledge of testing basics, experience with automation',
    skills: 'Manual Testing, Selenium, Jest, Postman, TestRail',
    employmentType: 'Full-time',
    category: 'IT, Testing',
  },
];

async function seed() {
  try {
    await dataSource.initialize();
    console.log('✅ Database connection established');

    const vacancyRepository = dataSource.getRepository(Vacancy);

    const existingVacancies = await vacancyRepository.count();
    if (existingVacancies > 0) {
      console.log(`⚠️  Database already contains ${existingVacancies} vacancies. Skipping seed.`);
      await dataSource.destroy();
      return;
    }

    const vacancyEntities = vacancyRepository.create(vacancies);
    await vacancyRepository.save(vacancyEntities);

    console.log(`✅ Added ${vacancies.length} test vacancies`);
    await dataSource.destroy();
    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    await dataSource.destroy();
    process.exit(1);
  }
}

seed();
