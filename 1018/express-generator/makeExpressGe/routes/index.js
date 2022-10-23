var express = require("express");
var router = express.Router();

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Express" });
});

// request handler : http method 함수의 가장 마지막 인자로 전달되는 함수
// req.params /path/:id
// req.query /path?page=2
// req.body 보통 POST요청에서 요청 데이터를 담고 들어옴
// req.get("...") HTTP Request의 헤더 값을 가지고 옴


// res.send() text형식으로 응답전송 
// res.json() json형식으로 응답전송
// res.render() html을 사용하여 화면을 정송
// res.set() http응답 헤더를 설정
// res.stauts() 응답의 상태값을 설정
module.exports = router;
