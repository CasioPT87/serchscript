const fetch = require('node-fetch')
const { addArticles } = require('../actions')

const fetchArticles = async (dispatch, getState) => {
  if (true) {
    const response = await fetch('http://localhost:8880/data/articles')
    const resposeData = await response.json()
    dispatch(addArticles(resposeData))
  }
}

module.exports = {
  fetchArticles,
}
