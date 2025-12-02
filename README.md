# Real Estate Favorites API

A RESTful API built with Express.js for managing real estate property favorites.

## Features

- ✅ Get all favorite properties
- ✅ Get a single property by ID
- ✅ Add a new favorite property
- ✅ Update an existing property
- ✅ Delete a property

## Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd real-estate-favorites-api
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file based on `.env.example`:
```bash
cp .env.example .env
```

4. Update the `.env` file with your configuration (optional):
```
PORT=3000
```

## Usage

### Development mode (with auto-restart):
```bash
npm run dev
```

### Production mode:
```bash
npm start
```

The server will start on `http://localhost:3000` (or the PORT specified in your .env file).

## API Endpoints

### Get all favorites
```
GET /api/favorites
```

### Get a single favorite
```
GET /api/favorites/:id
```

### Add a new favorite
```
POST /api/favorites
Content-Type: application/json

{
  "address": "123 Main St",
  "city": "New York",
  "price": 500000,
  "bedrooms": 3,
  "bathrooms": 2
}
```

### Update a favorite
```
PUT /api/favorites/:id
Content-Type: application/json

{
  "price": 550000
}
```

### Delete a favorite
```
DELETE /api/favorites/:id
```

## Technologies Used

- **Express.js** - Web framework
- **CORS** - Enable cross-origin requests
- **dotenv** - Environment variable management
- **nodemon** - Development auto-restart

## License

ISC
