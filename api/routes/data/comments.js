var express = require('express')
const db = require('../../../db/actions')
var router = express.Router()

// create new
router.post('/', async (req, res) => {
  const comment = await db.comments.create(req)
  return res.json(comment)
})

module.exports = router
