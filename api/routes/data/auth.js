const express = require('express')
const db = require('../../../db/actions')
const router = express.Router()
const { createToken, createCookie, clearCookie } = require('../utils')

// get list
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

// get one
router.post('/login', async (req, res) => {
  const user = await db.auth.show(req)
  if (!user) {
    return res.status(404).json({
      message: `We don't know who you are... we have already called internet police...`,
    })
  } else {
    if (user.validPassword(req.body.password)) {
      const token = await createToken(user)
      createCookie(res, token)
      res.send({ message: `Welcome back, ${user.name}` })
    } else {
      return res.status(400).json({
        message: 'Your password is not good, man',
      })
    }
  }
})

router.get('/logout', async (req, res) => {
  clearCookie(res)
  return res.json({ message: 'cookie deleted!' })
})

module.exports = router
