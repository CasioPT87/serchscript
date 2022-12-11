var express = require('express')
const routeArticle = require('./articles')
const routeAdmin = require('./admin')
const routeAuth = require('./auth')
const routeHome = require('./home')

const router = express.Router()

router.use('/admin', routeAdmin)
router.use('/auth', routeAuth)
router.use('/articles', routeArticle)
router.use('/', routeHome)

module.exports = router
