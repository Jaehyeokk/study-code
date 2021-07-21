var express = require("express");
var morgan = require("morgan");
var user = require("./api/user");
var app = express();

// Middleware
app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use(morgan("dev"));

app.use("/users", user);

// Server
app.listen(3000, function () {
  console.log("Server runnig at port 3000");
});

module.exports = app;
