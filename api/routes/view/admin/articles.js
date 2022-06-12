const express = require("express");
require("@babel/register");
const db = require('../../../../db/actions')
const { AppString } = require('../../../../client/src/components/main/App.jsx')
const router = express.Router();

// returns form to create a new article
router.get("/new", async (req, res) => {
  res.contentType('text/html');
  res.status(200);
  return res.send(AppString(null, 'articleForm'));
});

module.exports = router;
