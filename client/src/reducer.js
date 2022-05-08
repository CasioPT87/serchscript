const initialState = {
  someProp: "someValue",
  anotherProp: "anotherValue",
};

const reducer = (state = initialState, action = {}) => {
    console.log('reducer!!!!!!!')
  switch (action.type) {
    case "SOME_ACTION":
      return {
        ...state,
        someProp: action.someProp,
      };
    case "ANOTHER_ACTION":
      return {
        ...state,
        anotherProp: action.anotherProp,
      };
    default:
      return state;
  }
};

module.exports = reducer;
