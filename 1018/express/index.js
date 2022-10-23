const express = require("express");
const app = express();

app.use("/", (req, res, next) => {
  res.send("hi");
});
app.listen(8080, () => {
  console.log("server started");
});
