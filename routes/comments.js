var express = require('express');
const Comment = require('../db/models/comment')
var router = express.Router();

// create new
router.post("/", async (req, res, next) => {
  const { content = null, hidden = false, articleId = null } = req.body;

  const comment = new Comment();
  comment.content = content;
  comment.hidden = hidden;
  comment.article = articleId;
  comment
    .save()
    .then(async (c) => {
      res.json(c);
    })
    .catch(async (e) => {
      next(e);
    });
});

module.exports = router;
