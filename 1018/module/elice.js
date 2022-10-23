const name = "seungha";
const age = 25;
const nation = "kor";

//1.  모듈 내보내기
module.exports = {
  name,
  age,
  nation,
};

//2.  키 - 값으로 모듈 사용가능
exports.nameassss = name; //{ namessss: 'seungha' }

//3. 모듈은 여러번 실행되지 않음
// 모듈을 여러번 실행하고 싶으면 함수형 모듈로 사용해야한다.
module.exports = (name, age, nation) => {
  return {
    name,
    age,
    nation,
  };
};
