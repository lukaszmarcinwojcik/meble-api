var createError = require("http-errors");
var cookieSession = require("cookie-session");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var bodyParser = require("body-parser");
var logger = require("morgan");
var cors = require("cors");
var config = require("./config");
const bcrypt = require("bcrypt");
var mongoose = require("mongoose");

mongoose.connect(config.db, { useNewUrlParser: true });

var db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
var newsletterRouter = require("./routes/newsletter");
var adminRouter = require("./routes/admin");
var articleRouter = require("./routes/article");

var app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

app.use(logger("dev"));
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(
  cookieSession({
    name: "session",
    keys: config.keySession,
    maxAge: config.maxAgeSession,
  })
);

app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/newsletter", newsletterRouter);
app.use("/admin", adminRouter);
app.use("/article", articleRouter);

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
