var express = require("express");
const db = require('../../../db/actions')
var router = express.Router();

// get list
router.get("/", async (req, res, next) => {
  const articles = await db.articles.index()
  console.log('articles en el server', articles)
  return res.json(articles)
});

// get one
router.get("/:id", async (req) => {
  return db.articles.show(req)
});

module.exports = router;

