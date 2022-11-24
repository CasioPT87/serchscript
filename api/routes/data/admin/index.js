var express = require('express')
const { authorization } = require('../../middlewares')

const adminArticles = require('./articles')
const adminComments = require('./comments')
const adminImages = require('./images')

const router = express.Router()

router.use('*', authorization)

router.use('/articles', adminArticles)
router.use('/comments', adminComments)
router.use('/images', adminImages)

module.exports = router
