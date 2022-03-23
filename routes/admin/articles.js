var express = require('express');
const Article = require('../../db/models/article')
var router = express.Router();


//gets all articles
router.get('/', function(req, res, next) {
    res.send('respond in leches');
});

//info for a new article
router.get('/new', function(req, res, next) {
    // res.send('respond in new, que es new');
    console.log('este es el new')
    next('route')
}, () => {
    console.log('anda ya')
});

//create an article
router.post('/', function(req, res, next) {
    res.send('respond in leches');
});

//gets an article by id
router.get('/:id', function(req, res, next) {
  res.send('respond in index');
});

//updates an article by id
router.put('/:id', function(req, res, next) {
    res.send('respond in index');
});

//deletes an article by id
router.get('/id', function(req, res, next) {
    res.send('respond in leches');
});

module.exports = router;