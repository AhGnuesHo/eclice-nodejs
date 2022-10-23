const { Router } = require("express");

// 계층적 구조의 라우터에서 이전 라우터에서 전달 된 path parameter를 사용하고 싶을 때
const router = Router({ mergeParams: true });

router.get("/", (req, res, next) => {
  const { userId } = req.params;
  console.log(req.params);
  res.send(`Pets of ${userId} `);
});
module.exports = router;
