var express = require('express');
const jwt = require('jsonwebtoken')
const { secret } = require('../../../constants')
const adminArticles = require('./articles')
const adminComments = require('./comments')

const router = express.Router()

router.use('*', async (req, res, next) => {
    const token = req.cookies['cucarachasAppSession']
    if (token) {
        const decoded = await jwt.verify(token, secret)
        return next()
    }
    res.status(500).send('authentication failed!!') 
})

router.use('/articles', adminArticles)
router.use('/comments', adminComments)


module.exports = router;