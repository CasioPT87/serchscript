export type Action = <T>(arg?: T) => ActionReturn<T>
export type ActionReturn<T> = { type: string; payload: T }

const addArticles: Action = articles => ({
  type: 'ADD_ARTICLES',
  payload: articles,
})

const addArticle: Action = article => ({
  type: 'ADD_ARTICLE',
  payload: article,
})

const addArticleComment: Action = comment => ({
  type: 'ADD_ARTICLE_COMMENT',
  payload: comment,
})

const setLogged: Action = logged => ({
  type: 'SET_LOGGED',
  payload: logged,
})

const setArticleMessage: Action = message => ({
  type: 'SET_ARTICLE_MESSAGE',
  payload: message,
})

const setArticlesMessage: Action = message => ({
  type: 'SET_ARTICLES_MESSAGE',
  payload: message,
})

const setAuthMessage: Action = message => ({
  type: 'SET_AUTH_MESSAGE',
  payload: message,
})

const resetMessage: Action = () => ({
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
