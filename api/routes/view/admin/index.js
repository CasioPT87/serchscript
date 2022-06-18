var express = require('express');
const adminArticles = require('./articles')

const router = express.Router()

router.use('*', (req, res, next) => {
    console.log('do authorization here')
    next()
})

router.use('/articles', adminArticles)

module.exports = router;