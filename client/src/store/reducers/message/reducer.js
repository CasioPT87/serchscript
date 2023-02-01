const initialState = {
  message: {
    article: null,
    articles: null,
    auth: null,
  },
}

const reducer = (state = initialState, action = {}) => {
  let message = null
  const { payload } = action

  if (typeof payload === 'string' || payload instanceof String)
    message = payload
  if (payload instanceof Error || payload?.message) message = payload.message
  if (payload?.message) message = payload?.message

  switch (action.type) {
    case 'SET_ARTICLE_MESSAGE':
      return {
        ...state,
        article: message,
      }
    case 'SET_ARTICLES_MESSAGE':
      return {
        ...state,
        articles: message,
      }
    case 'SET_AUTH_MESSAGE':
      return {
        ...state,
        auth: message,
      }
    case 'RESET_MESSAGE':
      return initialState
    default:
      return state
  }
}

module.exports = reducer
