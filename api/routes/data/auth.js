const express = require("express");
const jwt = require('jsonwebtoken');
const db = require("../../../db/actions");
const router = express.Router();
const { secret } = require('../../constants')

// get list
router.post("/create", async (req, res, next) => {
  const newUser = await db.auth.create(req);
  if (newUser) {
    return jwt.sign({ name: newUser.name }, secret, { algorithm: 'RS256' }, token => {
      return res.json(token)
    });
  }
  res.status(500).send('error creating user')
});

// get one
router.post("/login", async (req, res) => {
  const user = await db.auth.show(req);
  if (!user) {
    return res.status(404).json({
      message: "No te conocemos, ya hemos avisado a la policia de internet...",
    });
  } else {
    if (user.validPassword(req.body.password)) {
      return jwt.sign({ name: newUser.name }, secret, { algorithm: 'RS256' }, token => {
        return res.json(token)
      });
    } else {
      return res.status(400).json({
        message: "Has metido mal el password, mangurrian",
      });
    }
  }
});

module.exports = router;
