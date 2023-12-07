const mongoose = require('mongoose');


//Mongoose skeema
const bookSchema = new mongoose.Schema({
  title: {
    type: String,
    unique: true,
    required: true,
  },
  author: {
    type: String,
    required: true,
    maxlength: 1000,
  },
  publication_year: {
    type: Number,
    required: true,
  },
  genre: {
    type: [String],
  },
  description: {
    type: String,
  },
  avg_rating: {
    type: Number,
    default: 0,
  },
});


//Mongoose model
const Book = mongoose.model('Book', bookSchema);

//Exportataan model
module.exports = Book;