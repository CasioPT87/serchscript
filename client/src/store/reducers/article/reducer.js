const initialState = {}

const reducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case 'ADD_ARTICLE':
      return {
        ...action.payload,
      }
    default:
      return state
  }
}

module.exports = reducer
