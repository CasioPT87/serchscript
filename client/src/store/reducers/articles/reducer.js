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
    default:
      return state
  }
}

module.exports = reducer
