const addArticles = articles => ({
  type: 'ADD_ARTICLES',
  payload: articles,
})

const addArticle = article => ({
  type: 'ADD_ARTICLE',
  payload: article,
})

const addArticleComment = comment => ({
  type: 'ADD_ARTICLE_COMMENT',
  payload: comment,
})

const setLogged = logged => ({
  type: 'SET_LOGGED',
  payload: logged,
})

const setArticleMessage = message => ({
  type: 'SET_ARTICLE_MESSAGE',
  payload: message,
})

const setArticlesMessage = message => ({
  type: 'SET_ARTICLES_MESSAGE',
  payload: message,
})

const setAuthMessage = message => ({
  type: 'SET_AUTH_MESSAGE',
  payload: message,
})

const resetMessage = () => ({
  type: 'RESET_MESSAGE',
  payload: null,
})

module.exports = {
  addArticles,
  addArticle,
  addArticleComment,
  setLogged,
  setArticleMessage,
  setArticlesMessage,
  setAuthMessage,
  resetMessage,
}
