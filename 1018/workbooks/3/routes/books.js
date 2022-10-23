const { Router } = require("express");
const routes = Router();

routes.get("/", (req, res, next) => {
  res.send("some books");
});

module.exports = routes;
