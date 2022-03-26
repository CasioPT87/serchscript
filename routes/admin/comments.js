var express = require("express");
const Comment = require("../../db/models/comment");
const Article = require("../../db/models/article");
var router = express.Router();

// delete all
router.delete("/all", function (req, res, next) {
  Comment.deleteMany({}).then((d) => {
    res.json(d);
  });
});

// get list of all
router.get("/", (req, res, next) => {
  Comment.find({})
    .then((as) => res.json(as))
    .catch((e) => {
      next(e);
    });
});

// get comments for article
router.get("/:articleId", async (req, res, next) => {
  const { articleId } = req.params;
  Article.findOne({ _id: articleId })
    .populate("comments")
    .select("comments")
    .then((cs) => {
      res.json(cs.comments);
    })
    .catch((e) => {
      next(e);
    });
});

// create new
router.post("/", async (req, res, next) => {
  let article = null;
  const { content = null, hidden = false, articleId = null } = req.body;

  const comment = new Comment();
  comment.content = content;
  comment.hidden = hidden;
  comment.article = articleId;
  comment
    .save()
    .then(async (c) => {
      article = await Article.findById(articleId);
      article.comments.push(c._id);
      await article.save();
      res.json(c);
    })
    .catch(async (e) => {
      await comment.remove();
      if (article) await article.remove();
      next(e);
    });
});

// update comment
router.put("/:id", async (req, res, next) => {
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

//deletes a comment by id
router.delete("/:id", function (req, res, next) {
  const { id } = req.params;
  Comment.findById(id)
    .remove()
    .then((c) => {
      res.json(c);
    })
    .catch((e) => {
      next(e);
    });
});

module.exports = router;
