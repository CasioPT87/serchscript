var express = require('express');
const adminArticles = require('./articles')
const adminComments = require('./comments')

const router = express.Router()

router.use('*', (req, res, next) => {
    console.log('do authorization here')
    next()
})

router.use('/articles', adminArticles)
router.use('/comments', adminComments)


module.exports = router;