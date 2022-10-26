const express = require("express");
const mongoose = require("mongoose");

const booksRouter = require("./routes/books");

const app = express();

mongoose.connect("mongodb://localhost:27017/myLibrary");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/", (req, res) => {
  res.send("root page");
});

app.use("/books", booksRouter);

app.listen(8080);
