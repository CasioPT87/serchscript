const express = require('express')
// require("@babel/register");
const { sendSSRResposeView } = require('../utils')
const router = express.Router()

// returns form to create a new article
router.get('/new', async (req, res) => {
  return sendSSRResposeView({
    res,
    fetchers: [],
    dataName: 'articleForm.create',
  })
})

// returns form to edit a new article
router.get('/:id/edit', async (req, res) => {
  return sendSSRResposeView({
    req,
    res,
    fetchers: ['fetchArticle'],
    dataName: 'articleForm.edit',
  })
})

module.exports = router
