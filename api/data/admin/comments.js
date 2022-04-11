var express = require("express");
const db = require('../../../db/actions')
var router = express.Router();

// delete all
router.delete("/all", function () {
  return db.comments.destroyAll()
});

// get list of all
router.get("/", () => {
  return db.comments.index()
});

// get comments for article
router.get("/:articleId", async () => {
  return db.comments.indexForArticle(req)
});

// create new
router.post("/", async () => {
  return db.comments.create()
});

// update comment
router.put("/:id", async (req) => {
  return db.comments.update(req)
});

//deletes a comment by id
router.delete("/:id", async (req) => {
  return db.comments.destroy(req)
});

module.exports = router;
