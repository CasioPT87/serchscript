var express = require('express');
const adminArticles = require('./articles')
const adminComments = require('./comments')

const app = express()

app.use('/', (req, res, next) => {
    console.log('do authorization here')
    next()
})

app.use('/articles', adminArticles)
app.use('/comments', adminComments)

app.use('/', (req, res, next) => {
    res.send('vuelvo a tener el control')
})


module.exports = app;