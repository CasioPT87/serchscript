const addArticles = articles => ({
  type: 'ADD_ARTICLES',
  payload: articles,
})

const addArticle = article => ({
  type: 'ADD_ARTICLE',
  payload: article,
})

module.exports = {
  addArticles,
  addArticle,
}
