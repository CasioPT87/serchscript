var express = require("express");
const routeArticle = require('./articles')
const routeComment = require('./comments')
const routeAdmin = require('./admin')

const router = express.Router()

router.use('/admin', routeAdmin)
router.use('/articles', routeArticle)
router.use('/comments', routeComment)

module.exports = router