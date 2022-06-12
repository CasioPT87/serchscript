var express = require("express");
const routeArticle = require('./articles')
const routeComment = require('./comments')
const routeAdmin = require('./admin')
const routeHome = require('./home')

const router = express.Router()


router.use('/admin', routeAdmin)
router.use('/articles', routeArticle)
router.use('/comments', routeComment)
router.use('/', routeHome)

module.exports = router