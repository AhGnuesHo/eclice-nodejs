const http = require("http");
const fs = require("fs");
const queryString = require("qs");
http
  .createServer((req, res) => {
    // get 요청이 들어온 경우
    if (req.method === "GET") {
      fs.readFile("./index.html", "utf8", function (error, data) {
        res.writeHead(200, { "Content-Type": "text/html" });
        res.end(data);
      });
    } else {
      // post
      // req.on ("data", 콜백) : 요청에 데이터가 있으면
      // req.on ("error") : 요청에 에러가 있으면
      // req.op ("end") : 요청의 데이터를 모두 받았으면
      req.on("data", (chunk) => {
        // chunk : 바디 데이터 원본, toString으로 읽기 좋게 해줘야한다.
        console.log(chunk.toString());
        // chunck를 객체로 만들기
        const data = queryString.parse(chunk.toString());
        res.writeHead(200, { "Content-Type": "text/html" });
        res.end("ID : " + data.id + "PW : " + data.pw);
      });
    }
  })
  .listen(8080, () => {
    console.log("server is running");
  });
