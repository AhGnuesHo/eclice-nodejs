var express = require("express");
var router = express.Router();
const { Post } = require("../models");
const asyncHandler = require("../utils/async-handler");

router.get(
  "/",
  asyncHandler(async (req, res) => {
    // write 파라미터가 있으면 edit 경로로
    if (req.query.write) {
      res.render("posts/edit");
      return;
    }
    // post 목록
    const post = await Post.find({});
    // view 에 post내용을 전달
    res.render("/posts/list", { post });
  })
);

// "/"에서 포스트 요청을 보내면
// 포스트 작성
router.post(
  "/",
  asyncHandler(async (req, res) => {
    const { title, content } = req.body;
    await Post.create({ title, content });
    // 디비에 내용이 생성되면 루트로 페이지 이동
    res.redirect("/");
  })
);

// 상세페이지
router.get(
  "/:shortId",
  asyncHandler(async (req, res, next) => {
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
  })
);

// 수정 요청 처리
router.post(
  ":/shortId",
  asyncHandler(async (req, res) => {
    const { shortId } = req.params;
    const { title, content } = req.body;
    const post = await Post.findOneAndUpdate({ shortId }, { title, content });
    if (!post) {
      next(new Error("post not found"));
      return;
    }
    res.redirect(`posts/${shortId}`);
  })
);

// 삭제
router.delete(
  "/:shortId",
  asyncHandler(async (req, res) => {
    const { shortId } = req.params;
    await Post.deleteOne({ shortId });
    res.send("ok");
  })
);

module.exports = router;
