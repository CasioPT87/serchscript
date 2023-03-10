const express = require('express')
require('@babel/register')({
  extensions: ['.js', '.tsx', '.ts'],
  presets: ['@babel/preset-typescript', '@babel/preset-env'],
})
const { sendSSRResposeView } = require('./utils')
const router = express.Router()

// get list
router.get('/', async (req, res, next) => {
  return sendSSRResposeView({
    req,
    res,
    fetchers: ['fetchArticles', 'fetchArticleLinks'],
    dataName: 'articles',
    errorHandler: next,
  })
})

module.exports = router
