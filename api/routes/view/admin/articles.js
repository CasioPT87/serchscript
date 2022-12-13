const express = require('express')
require('@babel/register')
const { sendSSRResposeView } = require('../utils')
const router = express.Router()

// returns form to create a new article
router.get('/new', async (req, res, next) => {
  return sendSSRResposeView({
    res,
    fetchers: [],
    dataName: 'articleForm.create',
    errorHandler: next,
  })
})

// returns form to edit a new article
router.get('/:id/edit', async (req, res, next) => {
  return sendSSRResposeView({
    req,
    res,
    fetchers: ['fetchArticle'],
    dataName: 'articleForm.edit',
    errorHandler: next,
  })
})

module.exports = router
