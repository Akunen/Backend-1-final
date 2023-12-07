const Review = require('../db/models/Review');
const { updateAverageRating } = require('../modules/ratingCalculator');

const reviewController = {
  // GET http://localhost:3000/books/:bookId/reviews
  findAll: async (req, res) => {
    try {
      const reviews = await Review.find({ bookId: req.params.bookId });
      res.json(reviews);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: 'Error retrieving reviews' });
    }
  },

  // POST http://localhost:3000/books/:bookId/reviews
  create: async (req, res) => {
    try {
      const review = await Review.create({ bookId: req.params.bookId, ...req.body });
      
      await updateAverageRating(req.params.bookId);

      res.json(review);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: 'Error creating review' });
    }
  },

  // PATCH http://localhost:3000/books/reviews/:id
  update: async (req, res) => {
    try {
      const updatedReview = await Review.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
      );
      const bookId = updatedReview.bookId;

      await updateAverageRating(bookId);

      res.json(updatedReview);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: 'Error updating review' });
    }
  },

  // DELETE http://localhost:3000/books/reviews/:id
  delete: async (req, res) => {
    try {
      const reviewId = req.params.id;
      const review = await Review.findById(reviewId);
      if (!review) {
        return res.status(404).json({ message: 'Review not found' });
      }

      const bookId = review.bookId;

      await Review.findByIdAndDelete(reviewId);

      await updateAverageRating(bookId);

      res.json({ message: 'Review deleted successfully' });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: 'Error deleting review' });
    }
  },
};

module.exports = reviewController;
