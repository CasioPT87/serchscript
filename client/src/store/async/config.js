const actions = require('../actions')

const requestConfig = {
  articles: {
    list: {
      method: 'GET',
      path: '/data/articles',
      searchParams: ['page', 'limit', 'text'],
    },
    show: {
      method: 'GET',
      path: '/data/articles/:articleTitleId',
      pathParams: ['articleTitleId'],
      successCallback: actions.addArticle,
    },
    create: {
      method: 'POST',
      path: '/data/admin/articles',
    },
    update: {
      method: 'PUT',
      path: '/data/admin/articles/:articleId',
      pathParams: ['articleId'],
    },
  },
  image: {
    upload: {
      method: 'POST',
      path: '/data/admin/images',
    },
  },
  comment: {
    create: {
      method: 'POST',
      path: '/data/comments',
    },
  },
  auth: {
    login: {
      method: 'GET',
      path: '/data/auth/logout',
    },
    login: {
      method: 'POST',
      path: '/data/auth/login',
    },
  },
}

module.exports = requestConfig
