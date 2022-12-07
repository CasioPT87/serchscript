const express = require('express')
require('@babel/register')
const { sendSSRResposeView } = require('./utils')
const router = express.Router()

// get list
router.get('/', async (req, res) => {
  return sendSSRResposeView({
    req,
    res,
    fetchers: ['fetchArticles'],
    dataName: 'articles',
  })
})

// get one
router.get('/:titleId', async (req, res) => {
  return sendSSRResposeView({
    req,
    res,
    fetchers: ['fetchArticle'],
    dataName: 'article',
  })
})

module.exports = router
