const _ = require('lodash')
const db = require('../../db/actions')
const defaultState = require('../../client/src/store/state')

const fetchers = {
  fetchArticles: {
    path: 'articles.list',
    fetch: db.articles.index,
  },
  fetchArticle: {
    path: 'article',
    fetch: db.articles.show,
  },
  fetchComments: {
    path: 'comments.list',
    fetch: db.comments.index,
  },
}

module.exports = async ({ req, fetchers: fetchActions }) => {
  const store = { ...defaultState }
  const selectedFetchers = await fetchActions.map(async fa => {
    const action = fetchers[fa]
    const data = await action.fetch(req)
    return { data, path: action.path }
  })

  const changesPayload = await Promise.all(selectedFetchers)
  changesPayload.forEach(cp => {
    _.set(store, cp.path, cp.data)
  })

  return store
}
