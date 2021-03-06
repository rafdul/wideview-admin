const mongoose = require('mongoose');

const apartmentSchema = new mongoose.Schema({
  id: { type: String },
  category: { type: String, required: true },
  name: { type: String, required: true },
  city: { type: String, required: true },
  location: { lat: Number, lng: Number },
  description: { type: String },
  price: { type: Number, required: true },
  bedrooms: { type: Number, required: true },
  kitchen: { type: Number },
  swimpool: { type: String },
  balcony: { type: Number },
  image: { type: Array },
});

module.exports = mongoose.model('Apartment', apartmentSchema);
