const addArticles = articles => ({
  type: 'ADD_ARTICLES',
  payload: articles,
})

const addArticlesArticle = article => ({
  type: 'ADD_ARTICLES_ARTICLE',
  payload: article,
})

const addArticle = article => ({
  type: 'ADD_ARTICLE',
  payload: article,
})

module.exports = {
  addArticles,
  addArticle,
  addArticlesArticle
}
