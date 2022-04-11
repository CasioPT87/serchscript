var express = require("express");
const db = require('../../db/actions')
var router = express.Router();

// get list
router.get("/", (req, res, next) => {
  return db.articles.index()
});

// get one
router.get("/:id", async (req) => {
  return db.articles.show(req)
});

module.exports = router;

