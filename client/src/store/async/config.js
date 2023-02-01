const actions = require('../actions')

const requestConfig = {
  articles: {
    list: {
      method: 'GET',
      path: '/data/articles',
      searchParams: ['page', 'limit', 'text'],
      successDispatch: [actions.addArticles],
      failDispatch: [actions.setArticlesMessage],
    },
    show: {
      method: 'GET',
      path: '/data/articles/:articleTitleId',
      pathParams: ['articleTitleId'],
      successDispatch: [actions.addArticle],
      failDispatch: [actions.setArticleMessage],
    },
    create: {
      method: 'POST',
      path: '/data/admin/articles',
      successDispatch: [actions.addArticle],
      failDispatch: [actions.setArticleMessage],
    },
    update: {
      method: 'PUT',
      path: '/data/admin/articles/:articleId',
      pathParams: ['articleId'],
      successDispatch: [actions.addArticle],
      failDispatch: [actions.setArticleMessage],
    },
  },
  image: {
    upload: {
      method: 'POST',
      path: '/data/admin/images',
      failDispatch: [actions.setArticleMessage],
    },
  },
  comment: {
    create: {
      method: 'POST',
      path: '/data/comments',
      failDispatch: [
        () => actions.setArticleMessage('Server failed creating comment'),
      ],
    },
  },
  auth: {
    login: {
      method: 'GET',
      path: '/data/auth/logout',
      successDispatch: [() => actions.setLogged(true)],
      failDispatch: [() => actions.setLogged(false), actions.setAuthMessage],
    },
    logout: {
      method: 'POST',
      path: '/data/auth/login',
      successDispatch: [() => actions.setLogged(false), actions.setAuthMessage],
      failDispatch: [() => actions.setAuthMessage('Problem logging out')],
    },
  },
}

module.exports = requestConfig
