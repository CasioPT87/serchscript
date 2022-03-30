var createError = require("http-errors");
require("dotenv").config();
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const connect = require("./db/connection");
var routeControllers = require("./routes/controllers");
const React = require("react");
const { renderToString } = require("react-dom/server");
// const App = require("./client/app")

var app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

connect();

app.use("/api", routeControllers);

app.use(handleRender);

function handleRender(req, res) {
//   const reactHtml = renderToString(<App />);
//   const htmlTemplate = `<!DOCTYPE html>
// <html>
//     <head>
//         <title>Universal React server bundle</title>
//     </head>
//     <body>
//         <div id="app">${reactHtml}</div>
//         <script src="public/client.bundle.js"></script>
//     </body>
// </html>`;
//   res.send(htmlTemplate);
}

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  const isDev = req.app.get("env") === "development";
  // set locals, only providing error in development
  res.locals.message = err.message;

  if (isDev) {
    console.log(err);
    res.locals.error = isDev ? err : {};
  }

  // render the error page
  res.status(err.status || 500);
  res.send("error");
});

module.exports = app;
