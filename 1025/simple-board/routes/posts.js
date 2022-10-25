var express = require("express");
var router = express.Router();
const { Post } = require("../models");

router.get("/", (req, res, next) => {
  // write 파라미터가 있으면 edit 경로로
  if (req.query.write) {
    res.render("posts/edit");
    return;
  }
  // post 목록
  const post = Post.find({});
  // view 에 post내용을 전달
  res.render("/posts/list", { post });
});

// "/"에서 포스트 요청을 보내면
// 포스트 작성
router.post("/", async (req, res, next) => {
  const { title, content } = req.body;
  try {
    await Post.create({ title, content });
    // 디비에 내용이 생성되면 루트로 페이지 이동
    res.redirect("/");
  } catch (e) {
    next(e);
  }
});

// 상세페이지
router.get("/:shortId", async (req, res, next) => {
  const { shortId } = req.params;
  const post = await Post.findOne({ shortId });
  if (!post) {
    next("can not found id ");
    return;
  }
  // 쿼리에 edit이 있으면
  const { edit } = req.query;
  if (edit) {
    res.render("posts/edit", { post });
  }
  res.render("posts/view", { post });
});

// 수정 요청 처리
router.post(":/shortId", async (req, res, next) => {
  const { shortId } = req.params;
  const { title, content } = req.body;
  try {
    const post = await Post.findOneAndUpdate({ shortId }, { title, content });
    if (!post) {
      next(new Error("post not found"));
      return;
    }
    res.redirect(`posts/${shortId}`);
  } catch (e) {
    next(e);
  }
});

// 삭제
router.delete("/:shortId", async (req, res, next) => {
  const { shortId } = req.params;
  try {
    await Post.deleteOne({ shortId });
    res.send("ok");
  } catch (e) {
    next(e);
  }
});

module.exports = router;
