const express = require('express')
const { authorization } = require('../../middlewares')

const adminArticles = require('./articles')
const adminImages = require('./images')

const router = express.Router()

router.use('*', authorization)

router.use('/articles', adminArticles)
router.use('/images', adminImages)

module.exports = router
