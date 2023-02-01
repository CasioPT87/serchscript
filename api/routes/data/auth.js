const express = require('express')
const db = require('../../../db/actions')
const router = express.Router()
const { createToken, createCookie, clearCookie } = require('../utils')

// create new user
// router.post('/create', async (req, res, next) => {
//   const user = await db.auth.show(req)
//   if (user)
//     return res
//       .status(403)
//       .json({ message: `Sorry, user with name: ${user.name} already exists` })
//   const newUser = await db.auth.create(req)
//   if (newUser) {
//     const token = await createToken(newUser)
//     createCookie(res, token)
//     return res.send({ message: `created user with name: ${newUser.name}` })
//   }
//   return res.status(500).send({ message: 'error creating user' })
// })

// tries to login session
router.post('/login', async (req, res, next) => {
  console.log('logiiiiiin')
  try {
    const user = await db.auth.show(req)
    if (!user) {
      return res.status(401).json({
        message: `We don't know who you are... we have already called internet police...`,
      })
    } else {
      if (user.validPassword(req.body.password)) {
        const token = createToken(user)
        createCookie(res, token)
        res.send({ message: `Welcome back, ${user.name}` })
      } else {
        return res.status(401).json({
          message: 'Your password is not good, man',
        })
      }
    }
  } catch (e) {
    next(e)
  }
})

// delete sesson for user
router.get('/logout', async (req, res, next) => {
  return new Promise(succ => {
    clearCookie(res)
    succ('cookie deleted!!')
  }).then(message => res.json({ message }))
})

module.exports = router
