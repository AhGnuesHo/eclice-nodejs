const express = require("express");
const cors = require("cors");

const app = express();

app.use(
  cors({
    // origin: "*",
    origin: ["http://localhost:1111"], // 이 상태로는 안됨
    methods: ["GET"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.get("/coffees", (req, res) => {
  res.json({
    error: null,
    data: [
      { type: "americano", orderedBy: "Rosa Bashirian", price: 3500 },
      { type: "americano", orderedBy: "Mrs. Shelly Rempel", price: 18000 },
      { type: "latte", orderedBy: "Carroll Schumm DDS", price: 1400 },
      { type: "cappuccino", orderedBy: "Monique Weissnat", price: 11000 },
      { type: "latte", orderedBy: "Jeremy Padberg", price: 14000 },
      { type: "americano", orderedBy: "Lola Kshlerin", price: 5700 },
      { type: "ice americano", orderedBy: "Bonnie Hermiston", price: 5500 },
      { type: "cappuccino", orderedBy: "Alfredo Altenwerth", price: 1000 },
      { type: "cold brew", orderedBy: "Clifton Johns", price: 14000 },
      { type: "ice americano", orderedBy: "Ms. Kenneth Fadel", price: 1900 },
      { type: "ice latte", orderedBy: "Clyde Schmitt", price: 3500 },
      { type: "ice latte", orderedBy: "Rolando Gleason", price: 1700 },
      { type: "cold brew", orderedBy: "Timmy Abshire", price: 12000 },
      { type: "americano", orderedBy: "Ms. Michele Jacobi", price: 13000 },
      { type: "latte", orderedBy: "Christine Hilpert DDS", price: 19000 },
      { type: "cappuccino", orderedBy: "Brandon Hammes", price: 2400 },
      { type: "cold brew", orderedBy: "Florence Monahan", price: 4700 },
      { type: "ice americano", orderedBy: "Mattie Halvorson", price: 7200 },
      { type: "ice cappuccino", orderedBy: "Lorene D'Amore", price: 14000 },
      { type: "latte", orderedBy: "Jerome Schinner II", price: 16000 },
    ],
  });
});

app.listen(8080, () => {
  console.log(`🚀 CORS가 반영된 카페 서버가 포트 8080에서 운영중입니다.`);
});
