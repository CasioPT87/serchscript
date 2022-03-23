var express = require("express");
const app = express()
const routeArticle = require('../article')
const routeComment = require('../comment')

// app.use('/admin', routeAdmin)
app.use('/article', routeArticle)
app.use('/comment', routeComment)

module.exports = app