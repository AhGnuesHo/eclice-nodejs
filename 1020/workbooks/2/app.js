const express = require("express");
const bookRouter = require("./routes/books");
const app = express();

app.get("/", (req, res, next) => {
  res.send("ok");
});

// app.use("/", (req, res, next) => {
//   res.send("ok");
// });

app.use("/books", bookRouter);

app.use((err, req, res, next) => {
  res.status(500);
  res.json({
    result: "fail",
    error: err.message,
  });
});

app.listen(8080);
