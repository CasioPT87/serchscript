const addArticles = articles => ({
  type: 'ADD_ARTICLES',
  payload: articles,
})

module.exports = {
  addArticles,
}
