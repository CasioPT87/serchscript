var express = require("express");
const db = require("../../../db/actions");
var router = express.Router();

// get list
router.post("/create", async (req, res, next) => {
  const newUser = await db.auth.create(req);
  return res.json(newUser);
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
      return res.status(201).send({
        message: `Hola ${user.name}!!!!!`,
      });
    } else {
      return res.status(400).json({
        message: "Has metido mal el password, mangurrian",
      });
    }
  }
});

module.exports = router;
