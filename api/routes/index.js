var express = require("express");
const homeController = require('./home')

const router = express.Router()

router.use('/', homeController)

router.use('/', (req, res) => {
    console.log('que paisha')
    res.contentType( 'text/html' );
    res.status(200);
    return res.send(res.reactComponent);
  })

module.exports = router