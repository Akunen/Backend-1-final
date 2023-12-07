const Book = require('../db/models/Book');
const Review = require('../db/models/Review');


const bookController = {

  // GET http://localhost:3000/books
  findAll: async (req, res) => {
    try {
      const books = await Book.find();
      res.json(books);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: 'Error retrieving books' });
    }
  },

  // GET http://localhost:3000/books/:id
  findById: async (req, res) => {
    try {
      const book = await Book.findById(req.params.id);
      res.json(book);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: 'Error retrieving book' });
    }
  },

  // GET http://localhost:3000/books/title/:title
  findByTitle: async (req, res) => {
    try {
      const title = req.params.title
      // Käytetään regular expressionia, jotta haku voi olla epätarkka, 'i' tekee hausta case insensitiivisen
      const book = await Book.findOne({ title: { $regex: new RegExp(title, 'i') } });
      res.json(book);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: 'Error retrieving book' });
    }
  },

  // GET http://localhost:3000/books/author/:author
  findByAuthor: async (req, res) => {
    try {
      const author = req.params.author
      const book = await Book.find({author: { $regex: new RegExp(author, 'i') } });
      res.json(book);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: 'Error retrieving book' });
    }
  },

  // GET http://localhost:3000/books/genre/:genre
  findByGenre: async (req, res) => {
    try {
      const genre = req.params.genre
      const book = await Book.find({genre: { $regex: new RegExp(genre, 'i') } });
      res.json(book);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: 'Error retrieving book' });
    }
  },

  // POST http://localhost:3000/books
  create: async (req, res) => {
    try {
      const book = await Book.create(req.body);
      res.json(book);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: 'Error creating book' });
    }
  },

  // PATCH http://localhost:3000/books/:id
  update: async (req, res) => {
    try {
      const book = await Book.findByIdAndUpdate({ _id: req.params.id }, { $set: req.body }, { new: true });
      res.json(book);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: 'Error updating book' });
    }
  },

  // DELETE http://localhost:3000/books/:id
  delete: async (req, res) => {
    try {
      const book = await Book.findByIdAndDelete(req.params.id);
      // Poistetaan myös kirjaan liittyvät arvostelut
      await Review.deleteMany({ bookId: req.params.id });
      res.json(book);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: 'Error deleting book' });
    }
  }

};

module.exports = bookController;
