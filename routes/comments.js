var express = require('express');
const Comment = require('../db/models/comment')
const Article = require('../db/models/article')
var router = express.Router();

// create new
router.post('/', async (req, res, next) => {
  let article = null
  const {
    content=null, 
    hidden=false,
    articleId=null
  } = req.body
  
  const comment = new Comment()
  comment.content = content
  comment.hidden = hidden
  comment.article = articleId
  comment.save()
    .then(async c => {
      article = await Article.findById(articleId)
      article.comments.push(c._id)
      await article.save()
      res.json(c)
    }).catch(async e => {
      await comment.remove()
      if (article) await article.remove()
      next(e)
    })
});

module.exports = router;
