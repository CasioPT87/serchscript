var express = require("express");
require("@babel/register");
const db = require('../../db/actions')
const { AppString } = require( '../../client/src/components/main/App.jsx' );

const router = express.Router()

router.get('/', async (req, res, next) => {
    // const articles = await db.articles.index()
    const articles = []
    res.reactComponent = AppString({ articles }, 'articles')
    next()
})

module.exports = router