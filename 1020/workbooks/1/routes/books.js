var express = require("express");
var router = express.Router();

router.get("/", function (req, res, next) {
  if (req.book) {
    const { title, author } = req.book;
    res.send(`BOOK: ${title}, ${author}`);
  }
});

module.exports = router;
