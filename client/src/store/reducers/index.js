const { combineReducers } = require("redux");
const articlesReducer = require("./articles/reducer");

const combinedStore = combineReducers({
  articles: articlesReducer,
});

module.exports = combinedStore;
