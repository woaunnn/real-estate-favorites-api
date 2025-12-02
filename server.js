const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Sample in-memory data store
let favorites = [
  { id: 1, address: '123 Main St', city: 'New York', price: 500000, bedrooms: 3, bathrooms: 2 },
  { id: 2, address: '456 Oak Ave', city: 'Los Angeles', price: 750000, bedrooms: 4, bathrooms: 3 }
];

// Routes
app.get('/', (req, res) => {
  res.json({ message: 'Welcome to Real Estate Favorites API' });
});

// Get all favorites
app.get('/api/favorites', (req, res) => {
  res.json(favorites);
});

// Get a single favorite by ID
app.get('/api/favorites/:id', (req, res) => {
  const favorite = favorites.find(f => f.id === parseInt(req.params.id));
  if (!favorite) {
    return res.status(404).json({ message: 'Favorite not found' });
  }
  res.json(favorite);
});

// Add a new favorite
app.post('/api/favorites', (req, res) => {
  const newFavorite = {
    id: favorites.length > 0 ? Math.max(...favorites.map(f => f.id)) + 1 : 1,
    ...req.body
  };
  favorites.push(newFavorite);
  res.status(201).json(newFavorite);
});

// Update a favorite
app.put('/api/favorites/:id', (req, res) => {
  const index = favorites.findIndex(f => f.id === parseInt(req.params.id));
  if (index === -1) {
    return res.status(404).json({ message: 'Favorite not found' });
  }
  favorites[index] = { ...favorites[index], ...req.body, id: parseInt(req.params.id) };
  res.json(favorites[index]);
});

// Delete a favorite
app.delete('/api/favorites/:id', (req, res) => {
  const index = favorites.findIndex(f => f.id === parseInt(req.params.id));
  if (index === -1) {
    return res.status(404).json({ message: 'Favorite not found' });
  }
  favorites.splice(index, 1);
  res.json({ message: 'Favorite deleted successfully' });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
