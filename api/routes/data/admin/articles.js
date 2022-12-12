var express = require('express')
const db = require('../../../../db/actions')
var router = express.Router()

// create new
router.post('/', async (req, res) => {
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
