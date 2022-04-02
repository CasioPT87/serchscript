var createError = require("http-errors");
require("dotenv").config();
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const connect = require("./db/connection");
var routeControllers = require("./routes/controllers");
const fs = require('fs')
require("@babel/register");
// const component = require('../client/src/component.jsx')
const App = require( './client/src/component.jsx' );
// const ReactDOMServer = require( 'react-dom/server' );

var app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static('../client/dist'));

connect();

app.use("/api", routeControllers);

app.use(handleRender);

function handleRender(req, res) {
  // read `index.html` file
  let indexHTML = fs.readFileSync(
    path.resolve(__dirname, "../client/dist/index.html"),
    {
      encoding: "utf8",
    }
  );

  console.log(indexHTML)

  // let appHTML = ReactDOMServer.renderToString( <App /> );

  // indexHTML = indexHTML.replace( '<body></body>', `<body><div id="root">${ App }</div></body>` );


  res.contentType( 'text/html' );
  res.status( 200 );
  return res.send( indexHTML );
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
