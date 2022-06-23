var express = require('express');
const { authorization } = require('../../middlewares')

const adminArticles = require('./articles')
const adminComments = require('./comments')

const router = express.Router()

router.use('*', authorization)

router.use('/articles', adminArticles)
router.use('/comments', adminComments)


module.exports = router;