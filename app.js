// app.js
const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Restaurant = require('./models/restaurant');

dotenv.config(); // Load environment variables from .env file
const app = express();
const PORT = process.env.PORT || 3000;

// Connect to MongoDB
mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error(err));

// Middleware to parse JSON
app.use(express.json());

//  API to get all restaurant details
app.get('/restaurants', async (req, res) => {
  try {
    const restaurants = await Restaurant.find();
    res.json(restaurants);
  } catch (err) {
    res.status(500).send(err);
  }
});

//  API to get restaurants by cuisine
app.get('/restaurants/cuisine/:cuisine', async (req, res) => {
  try {
    const cuisine = req.params.cuisine;
    const restaurants = await Restaurant.find({ cuisine: cuisine });
    res.json(restaurants);
  } catch (err) {
    res.status(500).send(err);
  }
});

//  API to sort restaurants by restaurant_id
app.get('/restaurants', async (req, res) => {
  try {
    const sortBy = req.query.sortBy === 'ASC' ? 1 : -1;
    const restaurants = await Restaurant.find()
      .sort({ restaurant_id: sortBy })
      .select('cuisine name city restaurant_id');
    res.json(restaurants);
  } catch (err) {
    res.status(500).send(err);
  }
});

//  API for Delicatessen cuisine and city not Brooklyn
app.get('/restaurants/Delicatessen', async (req, res) => {
  try {
    const restaurants = await Restaurant.find({
      cuisine: 'Delicatessen',
      city: { $ne: 'Brooklyn' },
    })
      .select('cuisine name city')
      .sort({ name: 1 });
    res.json(restaurants);
  } catch (err) {
    res.status(500).send(err);
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
