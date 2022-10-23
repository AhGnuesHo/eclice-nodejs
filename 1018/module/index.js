const counter = require("./counter");

// 사용때마다 모듈을 실행 -> 함수형 모듈
for (let i = 0; i < 10; i++) {
  console.log(counter());
}
