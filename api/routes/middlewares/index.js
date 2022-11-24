const authorization = async (req, res, next) => {
  if (req.isLogged) {
    return next()
  }
  res.status(500).send({ message: 'Authorization failed!! Please log in' })
}

module.exports = {
  authorization,
}
