var express = require("express");
var app = express();
var fs = require("fs");
var path = require("path");
var qs = require("querystring");
//1. body-parser 모듈을 불러오세요.

var bodyParser = require("body-parser");
var sanitizeHtml = require("sanitize-html");
var template = require("./lib/template.js");

//2.app.use()를 사용해서 json 타입의 데이터로 요청할 때 사용하는 bodyParser 를 로드하세요.(지시사항을 참고하세요)
// app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//route, routing
//app.get('/', (req, res) => res.send('Hello World!'))
app.get("/", function (request, response) {
  fs.readdir("./data", function (error, filelist) {
    var title = "Middleware";
    var description = "Use body-parser";
    var list = template.list(filelist);
    var html = template.HTML(
      title,
      list,
      `<h2>${title}</h2>${description}`,
      `<a href="/create">create</a>`
    );
    response.send(html);
  });
});

app.get("/page/:pageId", function (request, response) {
  fs.readdir("./data", function (error, filelist) {
    var filteredId = path.parse(request.params.pageId).base;
    fs.readFile(`data/${filteredId}`, "utf8", function (err, description) {
      var title = request.params.pageId;
      var sanitizedTitle = sanitizeHtml(title);
      var sanitizedDescription = sanitizeHtml(description, {
        allowedTags: ["h1"],
      });
      var list = template.list(filelist);
      var html = template.HTML(
        sanitizedTitle,
        list,
        `<h2>${sanitizedTitle}</h2>${sanitizedDescription}`,
        ` <a href="/create">create</a>
          <a href="/update/${sanitizedTitle}">update</a>
          <form action="/delete_process" method="post">
            <input type="hidden" name="id" value="${sanitizedTitle}">
            <input type="submit" value="delete">
          </form>`
      );
      response.send(html);
    });
  });
});

app.get("/create", function (request, response) {
  fs.readdir("./data", function (error, filelist) {
    var title = "WEB - create";
    var list = template.list(filelist);
    var html = template.HTML(
      title,
      list,
      `
      <form action="/create_process" method="post">
        <p><input type="text" name="title" placeholder="title"></p>
        <p>
          <textarea name="description" placeholder="description"></textarea>
        </p>
        <p>
          <input type="submit">
        </p>
      </form>
    `,
      ""
    );
    response.send(html);
  });
});

//아래 함수의 request라는 요청에 body-parser 미들웨어가 json 형태로 바꿔줍니다.
//create_process라는 라우터를 사용할때 request객체의 body property에 접근해서 간결하게 코드가 작성됨
app.post("/create_process", function (request, response) {
  var post = request.body;
  var title = post.title;
  var description = post.description;
  fs.writeFile(`data/${title}`, description, "utf8", function (err) {
    response.writeHead(302, { Location: `/?id=${title}` });
    response.end();
  });
});

app.get("/update/:pageId", function (request, response) {
  fs.readdir("./data", function (error, filelist) {
    var filteredId = path.parse(request.params.pageId).base;
    fs.readFile(`data/${filteredId}`, "utf8", function (err, description) {
      var title = request.params.pageId;
      var list = template.list(filelist);
      var html = template.HTML(
        title,
        list,
        `
        <form action="/update_process" method="post">
          <input type="hidden" name="id" value="${title}">
          <p><input type="text" name="title" placeholder="title" value="${title}"></p>
          <p>
            <textarea name="description" placeholder="description">${description}</textarea>
          </p>
          <p>
            <input type="submit">
          </p>
        </form>
        `,
        `<a href="/create">create</a> <a href="/update?id=${title}">update</a>`
      );
      response.send(html);
    });
  });
});

//3. `create_process`라는 라우터를 사용할 때  request 객체의 body에 접근해서 본문을 json 형태로 바꿔준것 과 마찬가지로 `update_process`라우터를 사용할 때에도 post, id, title, description을 request로 받은 형태를 json으로 바꾸세요.
app.post("/update_process", function (request, response) {
  var post = request.body;
  var id = post.id;
  var title = post.title;

  var description = post.description;
  fs.rename(`data/${id}`, `data/${title}`, function (error) {
    fs.writeFile(`data/${title}`, description, "utf8", function (err) {
      response.redirect(`/?id=${title}`);
    });
  });
});

app.post("/delete_process", function (request, response) {
  var post = request.body;
  var id = post.id;
  var filteredId = path.parse(id).base;
  fs.unlink(`data/${filteredId}`, function (error) {
    response.redirect("/");
  });
});

app.listen(8080, function () {
  console.log("Example app listening on port 8080!");
});
