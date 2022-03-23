var express = require('express');
const Article = require('../db/models/article')
var router = express.Router();

router.get('/:id', function(req, res, next) {
  res.send('respond in index');
});

router.get('/leches', function(req, res, next) {
  res.send('respond in leches');
});

module.exports = router;
