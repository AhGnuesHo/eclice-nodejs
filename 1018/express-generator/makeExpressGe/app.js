// Express의 가장 기본이 되는 파일
// 웹 어플리케이션의 기능 정의

var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
let sayRouter = require("./routes/says");

// expresss를 함수형 모듈로 생성
var app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

// use : 미들웨어를 사용하는 함수
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
// users경로하위에 들어오는 것을 usersRouter에서 처리
app.use("/users", usersRouter);
app.use("/says", sayRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;

// 패스 파라미터  : 주소의 일부를 변수처럼 사용할 수 있다.
