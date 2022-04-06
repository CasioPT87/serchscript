var express = require("express");
const dataControllers = require('../data')
const routeControllers = require('../routes')

const router = express.Router()

router.use('data/', dataControllers)
router.use('/', routeControllers)


module.exports = router