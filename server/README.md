# Vacancies API Server

Backend API for managing vacancies and favorites, built with NestJS and PostgreSQL.

## Description

RESTful API for managing job vacancies and user favorites. All required endpoints for vacancy management and favorites are implemented.

## Technologies

- **NestJS** - Progressive Node.js framework
- **TypeScript** - Typed JavaScript
- **PostgreSQL** - Relational database
- **TypeORM** - ORM for database operations
- **Swagger** - Automatic API documentation
- **Docker** - Application containerization

## Quick Start

### Prerequisites

- Node.js 20+
- PostgreSQL 15+ (or Docker)
- npm or yarn

### Installation

1. **Clone repository and navigate to server directory:**

```bash
cd server
```

2. **Install dependencies:**

```bash
npm install
```

3. **Configure environment variables:**

Create `.env` file based on `.env.example`:

```bash
cp .env.example .env
```

Edit `.env` file if needed:

```env
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=postgres
DB_DATABASE=vacancies_db

PORT=3000
NODE_ENV=development
```

### Running with Docker Compose

#### Development Mode (with hot-reload)

```bash
# Start PostgreSQL + Server with hot-reload
npm run docker:dev:build

# Or using docker compose directly
docker compose -f docker-compose.dev.yml up --build
```

**Features:**
- Hot-reload enabled - changes in `src/` automatically restart server
- Logs visible in real-time
- Source code mounted as volume

**View logs:**
```bash
docker compose -f docker-compose.dev.yml logs -f server
docker compose -f docker-compose.dev.yml logs -f postgres
```

**Stop:**
```bash
npm run docker:dev:down
# Or
docker compose -f docker-compose.dev.yml down
```

#### Production Mode

```bash
# Build and start production stack
npm run docker:prod:build

# Or using docker compose directly
docker compose up -d --build
```

**Stop:**
```bash
npm run docker:prod:down
# Or
docker compose down
```

### Running without Docker

1. **Ensure PostgreSQL is running.**

> 💡 **Database is created automatically** on first application start! You don't need to create it manually.

2. **Fill database with test data (optional):**

```bash
npm run seed
```

3. **Start server:**

```bash
# Development mode
npm run start:dev

# Production mode
npm run build
npm run start:prod
```

## Docker

### Development Stack (PostgreSQL + Server with hot-reload)

```bash
docker compose -f docker-compose.dev.yml up --build
```

**Stop:**
```bash
docker compose -f docker-compose.dev.yml down
```

**Stop and remove volumes:**
```bash
docker compose -f docker-compose.dev.yml down -v
```

### Production Stack (PostgreSQL + Server)

```bash
docker compose up -d --build
```

**Stop:**
```bash
docker compose down
```

### PostgreSQL Only (for local development)

```bash
docker compose -f docker-compose.dev.yml up -d postgres
```

## API Endpoints

### Vacancies

- `POST /vacancies` - Create a new vacancy
- `GET /vacancies` - Get all vacancies with search and pagination
  - Query parameters:
    - `keyword` (optional) - Search query to filter by title
    - `page` (optional, default: 1) - Page number
    - `limit` (optional, default: 4) - Items per page
  - Returns paginated response with `items` and `meta` (totalItems, itemCount, itemsPerPage, totalPages, currentPage)
- `GET /vacancies/:id` - Get vacancy by ID
- `DELETE /vacancies/:id` - Delete vacancy

### Favorites

- `GET /favorites` - Get all favorite vacancies
- `POST /favorites` - Add vacancy to favorites
- `DELETE /favorites/:id` - Remove vacancy from favorites

## Swagger Documentation

After starting the server, API documentation is available at:

**http://localhost:3000/api**

Swagger UI provides an interactive interface for testing all endpoints.

## Example Requests

```bash
# Create vacancy
curl -X POST http://localhost:3000/vacancies \
  -H "Content-Type: application/json" \
  -d '{"title": "Developer", "description": "Job description"}'

# Get all vacancies
curl http://localhost:3000/vacancies

# Search vacancies with pagination
curl "http://localhost:3000/vacancies?keyword=Frontend&page=1&limit=4"

# Add to favorites
curl -X POST http://localhost:3000/favorites \
  -H "Content-Type: application/json" \
  -d '{"vacancyId": 1}'
```

## Scripts

```bash
npm run start:dev          # Development mode
npm run build              # Build for production
npm run seed               # Fill database with test data
npm run docker:dev:build   # Start dev stack with Docker
npm run docker:prod:build  # Start prod stack with Docker
```

## Troubleshooting

**Database connection issues:**
- Ensure PostgreSQL is running
- Check `.env` configuration
- Database is created automatically on first start

**Docker issues:**
```bash
docker compose logs server
docker compose down && docker compose up -d --build
```
