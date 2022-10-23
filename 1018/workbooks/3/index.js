const express = require("express");
const app = express();
const port = 8080;
const bookRouter = require("./routes/books");
app.use("/books", bookRouter);
app.listen(port, () => {
  console.log("server started");
});
