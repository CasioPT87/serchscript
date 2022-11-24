var express = require('express')
const db = require('../../../db/actions')
var router = express.Router()

// get list
router.get('/', async (req, res, next) => {
  const articles = await db.articles.index(req)
  return res.json(articles)
})

// get one
router.get('/:id', async (req, res) => {
  const article = await db.articles.show(req)
  return res.json(article)
})

module.exports = router
