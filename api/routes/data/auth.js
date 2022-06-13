var express = require("express");
const db = require("../../../db/actions");
var router = express.Router();

// get list
router.post("/create", (req, res, next) => {
  const newUser = db.auth.create(req);
  return res.json(newUser);
});

// get one
router.post("/login", async (req) => {
  const user = db.auth.show(req);
  console.log('user', user)
  if (!user) {
    return res.status(404).json({
      message: "User not found.",
    });
  } else {
    if (user.validPassword(req.body.password)) {
      return res.status(201).send({
        message: "User Logged In",
      });
    } else {
      return res.status(400).json({
        message: "Wrong Password",
      });
    }
  }
});

module.exports = router;
