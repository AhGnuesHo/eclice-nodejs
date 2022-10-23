const books = require("../data/book.json");
const setBook = (req, res, next) => {
  const { bookNumber } = req.query;

  req.book = books[bookNumber];
  next();
};
module.exports = setBook;
