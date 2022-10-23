const http = require("http");

http
  .createServer((req, res) => {
    req.on("error", (err) => {
      // 에러가 발생하면 스택트레이스에 에러 출력
      console.error(err.stack);
    });
    res.writeHead(200, { "Content-Type": "text/html" });
    // end : 헤더와 본문데이터를 전달하고, 인자로 서버에 보낼 문장을 전달
    res.end("hello");
  })
  .listen(8080);
