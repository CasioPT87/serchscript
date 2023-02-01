const initialState = false

const reducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case 'SET_LOGGED':
      return action.payload
    default:
      return state
  }
}

module.exports = reducer
