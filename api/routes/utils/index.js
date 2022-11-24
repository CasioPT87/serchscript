const jwt = require('jsonwebtoken')
const { secret } = require('../../constants')

const createToken = user => {
  return jwt.sign({ name: user.name }, secret)
}

const verifyToken = token => {
  return jwt.verify(token, secret)
}

const COOKIE = {
  // httpOnly: true,
  secure: process.env.NODE_ENV === 'development' ? false : true,
  sameSite: 'Strict',
}

const createCookie = (res, token) => {
  res.cookie('serchScriptSession', token, {
    ...COOKIE,
    maxAge: 900000, // cookie will be removed after 8 hours
  })
}

const clearCookie = res => {
  res.clearCookie('serchScriptSession', {
    ...COOKIE,
  })
}

const hasValidCredentials = req => {
  const token = req.cookies['serchScriptSession']
  try {
    if (token) {
      verifyToken(token)
      return true
    } else {
      return false
    }
  } catch (e) {
    return false
  }
}

module.exports = {
  createToken,
  verifyToken,
  createCookie,
  clearCookie,
  hasValidCredentials,
}
