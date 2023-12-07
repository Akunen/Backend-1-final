const Review = require('../db/models/Review');
const Book = require('../db/models/Book');


// Funktio, joka päivittää kirjan keskiarvon arvosteluista
const updateAverageRating = async (bookId) => {
  try {
    // Haetaan kaikki kirjan arvostelut
    const reviews = await Review.find({ bookId });
    // Lasketaan arvostelujen määrä
    const totalReviews = reviews.length;
    // alustetaan muuttuja, johon lasketaan arvostelujen yhteispistemäärä
    let totalRating = 0;

    // Jos arvosteluja on, lasketaan niiden yhteispistemäärä
    // käyttäen reduce-funktiota
    if (totalReviews > 0) {
      totalRating = reviews.reduce((acc, review) => acc + review.rating, 0);
      
      // Lasketaan keskiarvo
      const avgRating = totalRating / totalReviews;

      // Pyöristetään keskiarvo kokonaisluvuksi
      const roundedAvgRating = Math.round(avgRating);

      // Päivitetään kirjan keskiarvo
      await Book.findByIdAndUpdate(bookId, { avg_rating: roundedAvgRating });
    } else {
      await Book.findByIdAndUpdate(bookId, { avg_rating: 0 });
    }
  } catch (error) {
    console.error('Error updating average rating:', error);
  }
};

module.exports = { updateAverageRating };

