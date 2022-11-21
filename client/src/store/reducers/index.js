const { combineReducers } = require('redux')
const articlesReducer = require('./articles/reducer')
const articleReducer = require('./article/reducer')

const combinedStore = combineReducers({
  articles: articlesReducer,
  article: articleReducer,
})

module.exports = combinedStore
