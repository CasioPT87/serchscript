var express = require('express')
const db = require('../../../db/actions')
var router = express.Router()

// create new
router.post('/', async () => {
  return db.comments.create()
})

module.exports = router
