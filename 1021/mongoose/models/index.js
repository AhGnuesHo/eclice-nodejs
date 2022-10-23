const mongoose = require("mongoose");
// PostSchema 로드하기

const Post = require("./schemas/post");
exports.Post = mongoose.model("Post", Post); // PostSchema로 모델 만들기
