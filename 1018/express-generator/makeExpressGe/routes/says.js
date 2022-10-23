var express = require("express");
var router = express.Router();

router.get("/:parameter", (req, res, next) => {
  const { parameter } = req.params;
  res.send(req.params.parameter);
});
module.exports = router;
