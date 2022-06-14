const User = require("../../db/models/user");

// get one
const show = async (req) => {
  const { name } = req.body;
  return User.findOne({ name });
};

// create new
const create = async (req) => {
  const { name, password } = req.body;
  const user = new User();
  user.name = name;
  user.setPassword(password);

  const newUser = await user.save();
  return {
    name: newUser.name,
  }
};

module.exports = { show, create };
