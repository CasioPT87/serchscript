var express = require('express');
const Article = require('../db/models/article')
var router = express.Router();

// get list
router.get('/', function(req, res, next) {
  res.send('get list');
});

// create new
router.post('/', function(req, res, next) {
  res.send('create new');
});

// get one
router.get('/:id', function(req, res, next) {
  res.send('get one');
});

// update one
router.put('/:id', function(req, res, next) {
  res.send('update one');
});

// delete one
router.delete('/:id', function(req, res, next) {
  res.send('delete one');
});


module.exports = router;
