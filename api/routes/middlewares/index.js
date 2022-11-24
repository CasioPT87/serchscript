const { verifyToken } = require('../utils')

const authorization = async (req, res, next) => {
  const token = req.cookies['serchScriptSession']
  console.log({ token })
  if (token) {
    await verifyToken(token)
    return next()
  }
  res.status(500).send({ message: 'Authorization failed!! Please log in' })
}

module.exports = {
  authorization,
}
