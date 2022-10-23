const express = require("express");

const adjuerQuery = require("./middlewares/adjust-query");
const userRouter = require("./routes/users");
const adminRouter = require("./routes/admins");
const setUser = require("./middlewares/set-user");

const app = express();
app.use(adjuerQuery);
app.get("/", (req, res) => {
  res.send("OK");
});
let myLogger = (req, res, next) => {
  console.log("LOGGED");
  next();
};
app.use("/users", myLogger, setUser("user"), userRouter);
app.use("/admins", myLogger, setUser("admin"), adminRouter);

app.listen(8080);
