var express = require("express");
const Article = require("../../db/models/article");
var router = express.Router();

// get list
router.get("/", (req, res, next) => {
  console.log('get list of articles')
  Article.find({})
    .then((as) => res.json(as))
    .catch((e) => {
      next(e);
    });
});

// get one
router.get("/:id", async (req, res, next) => {
  const { id } = req.params;
  Article.findOne({ _id: id })
    .populate("comments")
    .then((a) => res.json(a))
    .catch((e) => {
      next(e);
    });
});

module.exports = router;

