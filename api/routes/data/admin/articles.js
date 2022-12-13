const express = require('express')
const db = require('../../../../db/actions')
const { dataActionHandler } = require('../../utils')

const router = express.Router()

// create new
router.post('/', async (req, res, next) => {
  return dataActionHandler({ action: db.articles.create, req, res, next })
})

// update one
router.put('/:id', async (req, res, next) => {
  return dataActionHandler({ action: db.articles.update, req, res, next })
})

// delete one
router.delete('/:id', async (req, res, next) => {
  return dataActionHandler({ action: db.articles.destroy, req, res, next })
})

module.exports = router
