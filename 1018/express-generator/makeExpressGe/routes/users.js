var express = require("express");
var router = express.Router();
// router : app의 함수와 동일한 동작을 하는 함수
/* GET users listing. */
let petRouter = require("./pets");
router.use("/:userId/pets", petRouter);
router.get("/", (req, res) => {
  res.send("GET /users");
});

router.post("/", (req, res) => {
  res.send("POST /users");
});

router.put("/", (req, res) => {
  res.send("PUT /users");
});

router.delete("/", (req, res) => {
  res.send("DELETE /users");
});

module.exports = router;
