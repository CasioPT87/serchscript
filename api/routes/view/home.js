var express = require("express");
require("@babel/register");
const db = require('../../../db/actions')
const { AppString } = require('../../../client/src/components/main/App.jsx')

var router = express.Router();

// get list
router.get("/", async (req, res) => {
  res.contentType('text/html');
  res.status(200);
  return res.send(AppString({}, 'home'));
});

module.exports = router;

