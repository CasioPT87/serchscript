const express = require('express')
const db = require('../../../db/actions')
const { dataActionHandler } = require('../utils')

const router = express.Router()

// get list
router.get('/', async (req, res, next) => {
  return dataActionHandler({ action: db.articles.index, req, res, next })
})

// get one
router.get('/:titleId', async (req, res, next) => {
  return dataActionHandler({ action: db.articles.show, req, res, next })
})

module.exports = router
