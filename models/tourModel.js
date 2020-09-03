const mongoose = require('mongoose');

// creating schema/specify a schema for data
const tourSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'A tour must have a name.'],
    unique: true
  },
  price: {
    type: Number,
    required: [true, 'A tour must have a price.']
  },
  rating: {
    type: Number,
    default: 4.5
  }
});

// creating model
const Tour = mongoose.model('Tour', tourSchema);

module.exports = Tour;
