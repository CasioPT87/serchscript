const express = require('express')
require('@babel/register')({
  extensions: ['.js', '.tsx'],
  presets: ['@babel/preset-typescript'],
})
const { sendSSRResposeView } = require('./utils')
const router = express.Router()

// get one
router.get('/:titleId', async (req, res, next) => {
  return sendSSRResposeView({
    req,
    res,
    fetchers: ['fetchArticle'],
    dataName: 'article',
    errorHandler: next,
  })
})

module.exports = router
