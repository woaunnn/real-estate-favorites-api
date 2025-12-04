# Real Estate Favorites API

A RESTful API built with Express.js for managing real estate property favorites.

## Requirements

- Node.js >= 18.19.0
- npm >= 9.x

## Environment Variables

```bash
PORT=4000  # Server port (default: 4000)
```

## Installation

1. Install dependencies:

```bash
npm install
```

2. Create `.env` file (optional):

```bash
cp .env.example .env
```

## Running the Application

### Development mode (with auto-restart):

```bash
npm run dev
```

### Production mode:

```bash
npm start
```

### Run tests:

```bash
npm test
```

Server will start on `http://localhost:4000`

## API Endpoints

- `GET /api/properties` - Get all properties
- `GET /api/properties/:id` - Get property by ID
- `GET /api/users` - Get all users
- `POST /api/user/create` - Create new user
- `GET /api/user/:id` - Get user by ID
- `PATCH /api/user/favorites/:id` - Toggle property favorite
