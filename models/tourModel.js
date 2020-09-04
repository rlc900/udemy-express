const mongoose = require('mongoose');

// creating schema/specify a schema for data
const tourSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Tour must have a name.'],
    unique: true,
    trim: true
  },
  duration: {
    type: Number,
    required: [true, 'Tour must have a duration.']
  },
  maxGroupSize: {
    type: Number,
    required: [true, 'Tour must have a group size.']
  },
  difficulty: {
    type: String,
    required: [true, 'Tour must have a difficulty.']
  },
  price: {
    type: Number,
    required: [true, 'Tour must have a price.']
  },
  priceDiscount: Number,
  ratingsAverage: {
    type: Number,
    default: 4.5
  },
  ratingsQuantity: {
    type: Number,
    default: 0
  },
  summary: {
    type: String,
    trim: true,
    required: [true, 'Tour must have a description.']
  },
  description: {
    type: String,
    trim: true
  },
  imageCover: {
    type: String,
    required: [true, 'Tour must have a cover image.']
  },
  images: [String],
  createdAt: {
    type: Date,
    default: Date.now(),
    select: false
  },
  startDates: [Date]
});

// creating model
const Tour = mongoose.model('Tour', tourSchema);

module.exports = Tour;
