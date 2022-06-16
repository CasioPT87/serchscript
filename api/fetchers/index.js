const _ = require('lodash')
const db = require('../../db/actions')
const defaultState = require('../../client/src/store/state')

const fetchers = {
    fetchArticles: new Promise(res => {
        db.articles.index().then(articles => {
            res({ articles: { list: articles } })
        })    
    }),
    fetchComments: new Promise(res => {
        res({ leches: 'fritas' })
    })
}

module.exports = async (fetchActions) => {
  const selectedFetchers = fetchActions.map(fa => fetchers[fa])
  const storeChanges = await Promise.all(selectedFetchers)
  return storeChanges.reduce((prev, curr) => {
    return {
        ...prev,
        ...curr
    }
  }, defaultState)
}
