var express = require('express')
const dataControllers = require('./data')
const viewControllers = require('./view')

const router = express.Router()

router.use('/data', dataControllers)
router.use('/', viewControllers)

module.exports = router
