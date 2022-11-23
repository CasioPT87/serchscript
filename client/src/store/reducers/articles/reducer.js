const initialState = {
  list: [],
}

const reducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case 'ADD_ARTICLES':
      return {
        ...state,
        list: action.payload,
      }
    case 'ADD_ARTICLES_ARTICLE':
      return {
        ...state,
        list: state.list.concat(action.payload),
      }
    default:
      return state
  }
}

module.exports = reducer
