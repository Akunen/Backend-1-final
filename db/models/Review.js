const mongoose = require('mongoose');

//Mongoose skeema
const reviewSchema = new mongoose.Schema({
  bookId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Book',
    required: true,
  },
  review: {
    type: String,
    required: true,
  },
  rating: {
    type: Number,
    required: true,
  },
});

//Mongoose model
const Review = mongoose.model('Review', reviewSchema);

//Exportataan model
module.exports = Review;