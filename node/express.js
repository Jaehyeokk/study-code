const express = require("express");
// third party middleware
const morgan = require("morgan");
const app = express();

// user-defined middleware
function commonMw(req, res, next) {
  console.log("commonMw");
  next(new Error("error ouccered"));
}

// error middleware
function ErrorMw(err, req, res, next) {
  console.log(err.message);
  // error를 처리하거나 다음 미들웨어에 넘김
  next();
}

app.use(commonMw);
app.use(ErrorMw);
// 써드파티 미들웨어의 사용
app.use(morgan("dev"));

app.listen(3000, function () {
  console.log("Server is running");
});
