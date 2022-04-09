const Article = require("../../db/models/article");

// get list
const index = () => {
  return Article.find({})
};

// get one
const show = (req, res, next) => {
  const { id } = req.params;
  Article.findOne({ _id: id })
    .populate("comments")
    .then((a) => res.json(a))
    .catch((e) => {
      next(e);
    });
};

module.exports = { index, show };
