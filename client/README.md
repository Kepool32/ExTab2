# Vacancies Client

Frontend application for managing job vacancies built with React, TypeScript, Mantine, and Zustand.

## Technologies

- **React 18** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool
- **Mantine** - UI components library
- **Zustand** - State management
- **React Router** - Routing
- **Axios** - HTTP client

## Quick Start

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

Application will be available at `http://localhost:5173`

### Build

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

## Environment Variables

Copy example files and configure:

```bash
# For development
cp .env.development.example .env.development

# For production
cp .env.production.example .env.production

# Or create .env file
cp .env.example .env
```

**Development (.env.development):**
```env
VITE_API_URL=http://localhost:3000
```

**Production (.env.production):**
```env
VITE_API_URL=https://api.yourdomain.com
```

## Project Structure



## Features

- 🔍 Search vacancies
- 📄 Vacancy details
- ⭐ Favorites management
- 📱 Responsive design
- 🎨 Modern UI with Mantine
