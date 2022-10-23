// 함수형 모듈
// 모듈을 처음 로드할때만 0으로 셋팅 이후엔 변한값이 들어간다.
let count = 0;
module.exports = () => {
  return (count += 1);
};
