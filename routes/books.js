const express = require('express');
const router = express.Router();
const bookController = require('../controllers/bookController');
const reviewController = require('../controllers/reviewController');
const authorize = require('../auth/verifyToken');

/*
* BOOKCONTROLLER REITIT
*/

// GET http://localhost:3000/books
router.get('/', bookController.findAll);

// GET http://localhost:3000/books/:id
router.get('/:id', bookController.findById);

// GET http://localhost:3000/books/title/:title
router.get('/title/:title', bookController.findByTitle);

// GET http://localhost:3000/books/author/:author
router.get('/author/:author', bookController.findByAuthor);

// GET http://localhost:3000/books/genre/:genre
router.get('/genre/:genre', bookController.findByGenre);

// POST http://localhost:3000/books
router.post('/', authorize, bookController.create);

// PATCH http://localhost:3000/books/:id
router.patch('/:id', authorize, bookController.update);

// DELETE http://localhost:3000/books/:id
router.delete('/:id', authorize, bookController.delete);

/*
* REVIEWCONTROLLER REITIT
*/


// GET http://localhost:3000/books/:bookId/reviews
router.get('/:bookId/reviews', reviewController.findAll);

// POST http://localhost:3000/books/:bookId/reviews
router.post('/:bookId/reviews', authorize, reviewController.create);

// PATCH http://localhost:3000/books/reviews/:id
router.patch('/reviews/:id', authorize, reviewController.update);

// DELETE http://localhost:3000/books/reviews/:id
router.delete('/reviews/:id', authorize, reviewController.delete);



module.exports = router;