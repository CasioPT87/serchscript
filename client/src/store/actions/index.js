const addArticles = articles => ({
  type: 'ADD_ARTICLES',
  payload: articles,
})

const addArticleComment = comment => ({
  type: 'ADD_ARTICLE_COMMENT',
  payload: comment,
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
  setLogged,
}
