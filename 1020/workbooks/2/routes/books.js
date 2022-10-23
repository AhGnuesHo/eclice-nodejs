const express = require("express");
const router = express.Router();
const Book = require("../models/book");

router.get("/", (req, res, next) => {
  const bookList = Book.getBookList();
  res.json(bookList);
});

router.get("/:id", (req, res, next) => {
  const id = Number(req.params.id);
  try {
    const bookList = Book.findBook(id);
    res.json(bookList);
  } catch (e) {
    next(e);
  }
});

module.exports = router;
