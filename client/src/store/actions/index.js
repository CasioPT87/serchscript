const addArticles = articles => ({
  type: 'ADD_ARTICLES',
  payload: articles,
})

const addArticleComment = comment => ({
  type: 'ADD_ARTICLE_COMMENT',
  payload: comment,
})

const addArticlesArticle = article => ({
  type: 'ADD_ARTICLES_ARTICLE',
  payload: article,
})

const updateArticlesArticle = article => ({
  type: 'UPDATE_ARTICLES_ARTICLE',
  payload: article,
})

const addArticle = article => ({
  type: 'ADD_ARTICLE',
  payload: article,
})

const setLogged = logged => ({
  type: 'SET_LOGGED',
  payload: logged,
})

module.exports = {
  addArticles,
  addArticle,
  addArticleComment,
  addArticlesArticle,
  updateArticlesArticle,
  setLogged,
}
