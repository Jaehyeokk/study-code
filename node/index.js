var express = require("express");
var morgan = require("morgan");
var user = require("./api/user");
var app = express();

// Middleware
app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

if (process.env.NODE_ENV !== "test") {
  app.use(morgan("dev"));
}

app.use("/users", user);

module.exports = app;
