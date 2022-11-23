const express = require('express')
const db = require('../../../db/actions')
const router = express.Router()
const { createToken } = require('../utils')

// get list
router.post('/create', async (req, res, next) => {
  const newUser = await db.auth.create(req)
  if (newUser) {
    const token = await createToken(newUser)
    res.cookie('cucarachasAppSession', token)
    return res.send('ok')
  }
  return res.status(500).send('error creating user')
})

// get one
router.post('/login', async (req, res) => {
  const user = await db.auth.show(req)
  if (!user) {
    return res.status(404).json({
      message: 'No te conocemos, ya hemos avisado a la policia de internet...',
    })
  } else {
    if (user.validPassword(req.body.password)) {
      const token = await createToken(user)
      res.cookie('cucarachasAppSession', token)
      res.send({ name: user.name })
    } else {
      return res.status(400).json({
        message: 'Has metido mal el password, mangurrian',
      })
    }
  }
})

module.exports = router
