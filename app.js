const createError = require('http-errors')
require('dotenv').config()
const express = require('express')
const helmet = require('helmet')
const cookieParser = require('cookie-parser')
const logger = require('morgan')
const favicon = require('serve-favicon')
const path = require('path')
const connect = require('./db/connection')
const routes = require('./api/routes')
const { hasValidCredentials } = require('./api/routes/utils')

global.__basedir = __dirname

const app = express()

app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')))

console.log('node env', process.env.NODE_ENV)

app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static('./client/dist'))
app.use(express.static('./public'))
app.use(express.static('./public/images'))

connect()

app.use(
  helmet({
    contentSecurityPolicy: {
      directives: {
        imgSrc: [`'self'`, `data:`, `*`, `c:`],
        scriptSrc: [
          `'self'`,
          `'unsafe-inline'`,
          `https://*.googletagmanager.com`,
        ],
        styleSrc: [`'self'`, `*`],
        connectSrc: [`https://*.google-analytics.com/`],
      },
    },
  })
)

app.use((req, res, next) => {
  req.isLogged = hasValidCredentials(req)
  next()
})

app.use('/', routes)

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404))
})

// error handler
app.use(function (err, req, res, next) {
  const isDev = req.app.get('env') === 'development'
  // set locals, only providing error in development
  res.locals.message = err.message

  if (isDev) {
    // console.log(err)
    res.locals.error = isDev ? err : {}
  }

  // render the error page
  res.status(err.status || 500)
  console.log({ err })
  res.send(err)
})

module.exports = app
