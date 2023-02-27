const express = require('express')
require('@babel/register')({
  extensions: ['.js', '.tsx', '.ts'],
  presets: ['@babel/preset-typescript', '@babel/preset-env'],
})
const { sendSSRResposeView } = require('./utils')
const router = express.Router()

// get authentication form
router.get('/', async (req, res, next) => {
  return sendSSRResposeView({
    res,
    fetchers: [],
    dataName: 'loginForm',
    errorHandler: next,
  })
})

module.exports = router
