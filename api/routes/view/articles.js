const express = require("express");
require("@babel/register");
const { sendSSRResposeView } = require("./utils");
const router = express.Router();

// get list
router.get("/", async (req, res) => {
  return sendSSRResposeView({
    res,
    fetchers: ["fetchArticles"],
    dataName: "articles",
  });
});

// get one
router.get("/:id", async (req, res) => {
  return sendSSRResposeView({
    res,
    fetchers: [],
    dataName: "article",
  });
});

module.exports = router;
