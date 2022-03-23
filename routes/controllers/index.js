var express = require("express");
const app = express()
const routeArticle = require('../articles')
const routeComment = require('../comments')
const routeAdmin = require('../admin')

app.use('/admin', routeAdmin)
app.use('/articles', routeArticle)
app.use('/comments', routeComment)

module.exports = app