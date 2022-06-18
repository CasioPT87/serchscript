const express = require("express");
require("@babel/register");
const { sendSSRResposeView } = require("./utils");
const router = express.Router();

// get authentication form
router.get("/", async (req, res) => {
  return sendSSRResposeView({
    res,
    fetchers: [],
    dataName: "loginForm",
  });
});

module.exports = router;

