const express = require("express");
require("@babel/register");
const { sendSSRResposeView } = require("./utils");
const router = express.Router();

// get list
router.get("/", async (req, res) => {
  return sendSSRResposeView({
    res,
    fetchers: [],
    dataName: "home",
  });
});

module.exports = router;
