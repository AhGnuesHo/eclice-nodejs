const express = require("express");
const app = express();

// 아래 코드를 실행하면 root page와 first는 출력되지만 second는 출력되지 않는다.
// 미들웨어를 통해 해결할 수 있다.

// app.use("/", (req, res) => {
//   console.log("first");
//   res.send("root page");
// });

// app.get("/", (req, res) => {
//   res.send("second");
// });

const setBook = require("./middlewares/set-book");
const bookRouter = require("./routes/books");
app.use("/books", setBook, bookRouter);
app.listen(8080);
