const _ = require('lodash')
const db = require('../../db/actions')
const defaultState = require('../../client/src/store/state')

const fetchers = {
  fetchArticles: {
    path: 'articles.list',
    fetch: db.articles.index,
  },
  fetchComments: {
    path: 'comments.list',
    fetch: db.comments.index,
  },
}

module.exports = async fetchActions => {
  const store = { ...defaultState }
  console.log({ fetchActions })
  const selectedFetchers = await fetchActions.map(async fa => {
    const action = fetchers[fa]
    const data = await action.fetch()
    return { data, path: action.path }
  })

  const changesPayload = await Promise.all(selectedFetchers)
  console.log({ changesPayload })
  changesPayload.forEach(cp => {
    _.set(store, cp.path, cp.data)
  })

  return store
}
