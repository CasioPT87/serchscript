const express = require('express')
require('@babel/register')
const { sendSSRResposeView } = require('./utils')
const router = express.Router()

// get list
router.get('/', async (req, res, next) => {
  return sendSSRResposeView({
    req,
    res,
    fetchers: ['fetchArticles'],
    dataName: 'articles',
    errorHandler: next
  })
})

module.exports = router
