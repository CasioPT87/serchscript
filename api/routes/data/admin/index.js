var express = require('express');
const { secret } = require('../../../constants')
const adminArticles = require('./articles')
const adminComments = require('./comments')

const router = express.Router()

router.use('*', (req, res, next) => {
    const token = req.header.authentication
    if (token) {
        return jwt.verify(token, secret, function(err, decoded) {
            if (!error) return next()
        });
    }
    res.status(500).send('authentication failed!!') 
})

router.use('/articles', adminArticles)
router.use('/comments', adminComments)


module.exports = router;