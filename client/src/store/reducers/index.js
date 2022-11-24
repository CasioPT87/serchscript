const { combineReducers } = require('redux')
const articlesReducer = require('./articles/reducer')
const articleReducer = require('./article/reducer')
const loggedReducer = require('./logged/reducer')

const combinedStore = combineReducers({
  articles: articlesReducer,
  article: articleReducer,
  logged: loggedReducer
})

module.exports = combinedStore
