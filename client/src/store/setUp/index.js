const { createStore, applyMiddleware } = require('redux')
const thunkMiddleware = require('redux-thunk').default
const { composeWithDevTools } = require('@redux-devtools/extension');
const combinedReducers = require('../reducers')
const defaultState = require('../state')

const composedEnhancer = composeWithDevTools(applyMiddleware(thunkMiddleware))

const setUpStore = (initialState) => {
    return createStore(combinedReducers, { ...defaultState, ...initialState }, composedEnhancer)
}

module.exports = setUpStore