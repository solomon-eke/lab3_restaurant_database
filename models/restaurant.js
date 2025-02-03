const mongoose = require('mongoose');

// Create Schema
const restaurantSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please enter the restaurant name'],
      trim: true,
      lowercase: true,
    },
    city: {
      type: String,
      required: [true, 'City is required'],
      trim: true,
      lowercase: true,
    },
    cuisine: {
      type: String,
      required: [true, 'Cuisine type is required'],
      trim: true,
      lowercase: true,
    },
  },
  { timestamps: true }
); // Automatically adds createdAt and updatedAt fields

const Restaurant = mongoose.model('Restaurants', restaurantSchema);
module.exports = Restaurant;
