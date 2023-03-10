const { combineReducers } = require('redux')
const articlesReducer = require('./articles/reducer')
const articleReducer = require('./article/reducer')
const loggedReducer = require('./logged/reducer')
const messageReducer = require('./message/reducer')
const articleLinkListReducer = require('./articleLinkList/reducer')

const combinedStore = combineReducers({
  articles: articlesReducer,
  article: articleReducer,
  logged: loggedReducer,
  message: messageReducer,
  articleLinkList: articleLinkListReducer,
})

module.exports = combinedStore
