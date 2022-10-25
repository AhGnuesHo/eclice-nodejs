const mongoose = require("mongoose");
const BookSchema = require("./schemas/book");

exports.Book = mongoose.model("Book", BookSchema);
