const initialState = false

const reducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case 'SET_LOGGED':
      return action.payload
    default:
      return initialState
  }
}

module.exports = reducer
