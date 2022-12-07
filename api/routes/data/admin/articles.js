var express = require('express')
const db = require('../../../../db/actions')
var router = express.Router()

// delete all
router.delete('/', (req, res, next) => {
  return db.articles.destroyAll()
})

// get list
router.get('/', async (req, res, next) => {
  const articles = await db.articles.index()
  res.json(articles)
})

// get one
router.get('/:titleId', async req => {
  return db.articles.show(req)
})

// create new
router.post('/', express.urlencoded({ extended: true }), async (req, res) => {
  const article = await db.articles.create(req)
  return res.json(article)
})

// update one
router.put('/:id', async (req, res) => {
  const article = await db.articles.update(req)
  return res.json(article)
})

// delete one
router.delete('/:id', async req => {
  return db.articles.destroy(req)
})

module.exports = router
