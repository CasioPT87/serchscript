const initialState = []

const reducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case 'SET_ARTICLE_LINK_LIST':
      return action.payload
    default:
      return state
  }
}

module.exports = reducer
