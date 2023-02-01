const initialState = {}

const reducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case 'ADD_ARTICLE':
      return {
        ...state,
        ...action.payload,
      }
    case 'ADD_ARTICLE_COMMENT':
      return {
        ...state,
        comments: state.comments.concat([action.payload]),
      }
    default:
      return state
  }
}

module.exports = reducer
