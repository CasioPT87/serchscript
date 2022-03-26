var express = require('express');
const Article = require('../db/models/article')
var router = express.Router();

// get list
router.get('/', function(req, res, next) {
  Article.find({})
    .then(as => res.json(as))
    .catch(e => {
      next(e)
    })
});

// create new
router.post('/', async (req, res, next) => {
  const {
     title='Escribe un titulo',
     description='Escribe una descripcion',
     content='El contenido esta vacio', 
     hidden=true
  } = req.body
  const article = new Article()
  article.title = title
  article.description = description
  article.content = content
  article.hidden=hidden

  article.save()
    .then(a => res.json(a))
    .catch(e => {
      next(e)
  })
});

// get one
router.get('/:id', async (req, res, next) => {
  const { id } = req.query
  Article.findOne(id)
    .populate('comments')
    .then(a => res.json(a))
    .catch(e => {
      next(e)
  })
});

// update one
router.put('/:id', async (req, res, next) => {
  const { id } = req.query
  const article = await Article.findOne(id)
    .catch(e => {
      next(e)
    })

  const {
    title=article.title,
    description=article.description,
    content=article.content, 
    hidden=article.hidden
  } = req.body

  article.title = title
  article.description = description
  article.content = content
  article.hidden=hidden

  article.save()
    .then(a => res.json(a))
    .catch(e => {
      next(e)
    })
});

// delete one
router.delete('/:id', async (req, res, next) => {
  const { id } = req.query
  const article = await Article.findOne(id)
  article.remove()
    .then(as => res.json(as))
    .catch(e => {
      next(e)
    })
});

module.exports = router;
