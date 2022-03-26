var express = require('express');
const adminArticles = require('./articles')
const adminComments = require('./comments')

const router = express.Router()

router.use('/', (req, res, next) => {
    console.log('do authorization here')
    next()
})

router.use('/articles', adminArticles)
router.use('/comments', adminComments)

router.use('/', (req, res, next) => {
    res.send('vuelvo a tener el control')
})


module.exports = router;