var express = require("express");
const dataControllers = require('../routes/data')
const viewControllers = require('../routes/view')

const router = express.Router()

router.use('/data', dataControllers)
router.use('/', viewControllers)

module.exports = router