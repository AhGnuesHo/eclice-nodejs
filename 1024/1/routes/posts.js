var express = require("express");
const { rawListeners } = require("../app");
var router = express.Router();
const { Post } = require("../models");

/* GET users listing. */
router.get("/", async (req, res, next) => {
  if (req.query.write) {
    // 게시글 작성
    res.render("post/edit");
    return;
  }
  // 게시글 목록
  const list = await Post.find({});
  res.render("post/list", { list });
});

// id로 찾기
router.get("/:shortId", async (req, res, next) => {
  try {
    const { shortId } = req.params;
    const post = await Post.findOne({ shortId });
    res.render("post/view", { post });
  } catch (e) {
    next(e);
  }
});

// 게시글 생성
router.post("/", async (req, res, next) => {
  try {
    const { title, content } = req.body;
    if (!title || !content) {
      throw new Error("제목과 내용을 작성해주세요");
    }
    const post = await Post.create({ title, content });
    res.redirect(`/post/${post.shortId}`);
  } catch (e) {
    next(e);
  }
});

// 아이디로 게시글 수정
router.get("/:shortId", async (req, res, next) => {
  try {
    const { shortId } = req.params;
    const { title, content } = req.body;
    const result = await Post.updateOne({ shortId }, { title, content });
    if (result.n === 1) {
      res.redirect(`posts/${shortId}`);
    } else {
      throw new Error("can not found id");
    }
  } catch (e) {
    next(e);
  }
});

// 아이디로 게시글 삭제
router.delete("/:shortId", async (req, res, next) => {
  const { shortId } = req.params;
  try {
    await Post.deleteOne({ shortId });
  } catch (e) {
    next(e);
  }
});
module.exports = router;
