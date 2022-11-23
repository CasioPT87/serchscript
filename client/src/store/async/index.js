const fetch = require('node-fetch')
const { addArticles, addArticle } = require('../actions')

const fetchArticles = () => async (dispatch, getState) => {
  const response = await fetch('http://localhost:8880/data/articles')
  const responseData = await response.json()
  dispatch(addArticles(responseData))
}

const fetchArticle = id => async (dispatch, getState) => {
  const response = await fetch(`http://localhost:8880/data/articles/${id}`)
  const responseData = await response.json()
  dispatch(addArticle(responseData))
}

module.exports = {
  fetchArticles,
  fetchArticle,
}
