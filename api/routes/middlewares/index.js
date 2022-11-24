const { verifyToken } = require('../utils')

const authorization = async (req, res, next) => {
  const token = req.cookies['serchScriptSession']
  if (token) {
    await verifyToken(token)
    return next()
  }
  res.status(500).send({ message: 'authentication failed!!' })
}

module.exports = {
  authorization,
}
