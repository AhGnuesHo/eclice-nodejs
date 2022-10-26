const { Router } = require("express");
const { Book } = require("../models");

const router = Router();

// "/" 경로에서 전체 책 데이터를 DB에서 찾아 반환하세요.
router.get("/", async (req, res) => {
  res.json(await Book.find({}));
});

// "/:id" 경로에서 입력된 id에 해당하는 책 데이터를 DB에서 찾아 반환하세요.
router.get("/:id", async (req, res) => {
  const { id } = req.params;
  const book = await Book.findOne({ id });
  res.json(book);
});
module.exports = router;
