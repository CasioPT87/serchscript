const jwt = require('jsonwebtoken')
const { secret } = require('../../constants')

const createToken = user => {
  return jwt.sign({ name: user.name }, secret)
}

const verifyToken = token => {
  return jwt.verify(token, secret)
}

module.exports = {
  createToken,
  verifyToken,
}
