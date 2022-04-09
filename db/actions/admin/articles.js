var express = require("express");
const Article = require("../../../db/models/article");
var router = express.Router();

// delete all
router.delete("/all", (req, res, next) => {
  Article.deleteMany({}).then((d) => {
    res.json(d);
  });
});

// get list
router.get("/", (req, res, next) => {
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

// create new
router.post("/", async (req, res, next) => {
  const {
    title = "Escribe un titulo",
    description = "Escribe una descripcion",
    content = "El contenido esta vacio",
    hidden = true,
  } = req.body;
  const article = new Article();
  article.title = title;
  article.description = description;
  article.content = content;
  article.hidden = hidden;

  article
    .save()
    .then((a) => res.json(a))
    .catch((e) => {
      next(e);
    });
});

// update one
router.put("/:id", async (req, res, next) => {
  const { id } = req.params;

  const {
    title,
    description,
    content,
    hidden,
  } = req.body;

  const filteredValues = Object.entries({
    title,
    description,
    content,
    hidden,
  }).reduce((prev, [k, v]) => {
    if (v) {
        return {
            ...prev,
            [k]: v
        }
    }
    return prev
  }, {})

  Article.findOneAndUpdate(
    { _id: id },
    filteredValues,
    { new: true }
  )
    .then((a) => res.json(a))
    .catch((e) => {
      next(e);
    });
});

// delete one
router.delete("/:id", async (req, res, next) => {
  const { id } = req.params;
  Article.findOneAndDelete({ _id: id })
    .then((as) => res.json(as))
    .catch((e) => {
      next(e);
    });
});

module.exports = router;
