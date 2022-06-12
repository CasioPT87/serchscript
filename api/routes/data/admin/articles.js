var express = require("express");
const db = require('../../../../db/actions')
var router = express.Router();

// delete all
router.delete("/all", (req, res, next) => {
  return db.articles.destroyAll()
});

// get list
router.get("/", (req, res, next) => {
  return db.articles.index()
});

// get one
router.get("/:id", async (req) => {
  return db.articles.show(req)
});

// create new
router.post("/", async () => {
  return db.articles.create()
});

// update one
router.put("/:id", async (req) => {
  return db.articles.update(req)
});

// delete one
router.delete("/:id", async (req) => {
  return db.articles.destroy(req)
});

module.exports = router;
