const express = require("express");
const app = express();
const port = 8080;

app.use("/:follow", (req, res, next) => {
  res.set({
    "Content-Type": "text/json",
    ETag: "10000",
    // ETag Http 헤더, 리소스를 식별하기 위해 사용
  });
  res.status(201);

  // 보내는 데이터 형식이 json인 경우 res.send 보다 res.json을 사용하는 것이 좋다.
  //  res.json의 실행 횟수가 더 적기 때문에 효율적.
  // res.send: res.send → res.json → res.send
  // res.json: res.json → res.send
  res.json(req.params);
});
app.listen(port);
