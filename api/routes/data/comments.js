const express = require('express')
const db = require('../../../db/actions')
const { dataActionHandler } = require('../utils')


const router = express.Router()

// create new
router.post('/', async (req, res, next) => {
  return dataActionHandler({ action: db.comments.create, req, res, next })
})

module.exports = router
