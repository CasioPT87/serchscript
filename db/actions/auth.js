const User = require("../../db/models/user");

// get one
const show = (req) => {
  const { name } = req.params;
  return User.findOne({ name });
};

// create new
const create = (req) => {
  const { name, password } = req.body;
  const user = new User();
  user.name = title;
  newUser.setPassword(password);

  return newUser.save((err, newUser) => {
    if (err) {
      return null
    } else {
      return newUser
    }
  });
};

module.exports = { show, create };
