const jwt = require('jsonwebtoken')

const secret = process.env.SECRET

const createToken = user => {
  return jwt.sign({ name: user.name }, secret, { expiresIn: '8h' }) // token expires in 8 hours
}

const verifyToken = token => {
  return jwt.verify(token, secret)
}

const COOKIE = {
  httpOnly: true, // so front-end js can NOT manipulate the cookie
  secure: process.env.NODE_ENV === 'development' ? false : true, // cookie is sent only through https?
  sameSite: 'Strict', // so cookie is not sent to third-party apps
  domain: process.env.DOMAIN,
}

const createCookie = (res, token) => {
  res.cookie('serchScriptSession', token, {
    ...COOKIE,
    maxAge: 8 * 60 * 60 * 1000, // cookie will be removed after 8 hours
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

const dataActionHandler = ({ action, req, res, next }) => {
  return new Promise(succ => {
    succ(action(req, res))
  })
    .then(result => res.json(result))
    .catch(e => {
      console.log({ e })
      next(e)
    })
}

module.exports = {
  dataActionHandler,
  createToken,
  verifyToken,
  createCookie,
  clearCookie,
  hasValidCredentials,
}
