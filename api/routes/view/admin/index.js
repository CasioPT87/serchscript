const express = require("express");
const adminArticles = require("./articles");
const { authorization } = require("../../middlewares");

const router = express.Router();

router.use("*", authorization);

router.use("/articles", adminArticles);

module.exports = router;
