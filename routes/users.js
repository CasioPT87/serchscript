var express = require('express');
const Article = require('../db/models/article')
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  const article = new Article({
    title: 'bonito titulo',
    description: 'esta es la descripcion',
    published: false
  });
  // Save Tutorial in the database
  article
    .save(article)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Article."
      });
    });
});

module.exports = router;
