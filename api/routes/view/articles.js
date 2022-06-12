var express = require("express");
require("@babel/register");
const db = require('../../../db/actions')
const { AppString } = require('../../../client/src/components/main/App.jsx')
var router = express.Router();

// get list
router.get("/", async (req, res) => {
  const articles = await db.articles.index()
  AppString({ articles }, 'articles')
  res.contentType('text/html');
  res.status(200);
  return res.send(AppString({ articles }, 'articles'));
});

// get one
router.get("/:id", async (req, res) => {
  const article = await db.articles.show(req)
  console.log('articles killo', article)
  res.contentType('text/html');
  res.status(200);
  return res.send(AppString({ article }, 'article'));
});

module.exports = router;

