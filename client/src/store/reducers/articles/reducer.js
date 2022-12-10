const initialState = {
  list: {},
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
    case 'UPDATE_ARTICLES_ARTICLE':
      const id = action.payload._id
      const index = state.list.findIndex(article => article._id === id)
      return {
        ...state,
        list: state.list.map((article, i) => {
          if (i === index) return action.payload
          return article
        }),
      }
    default:
      return state
  }
}

module.exports = reducer
