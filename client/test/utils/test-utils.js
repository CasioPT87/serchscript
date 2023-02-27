const React = require('react')
const { render } = require('@testing-library/react')
const createStore = require('../../src/store/setUp')
const { Provider } = require('react-redux')

function renderWithProviders(
  ui,
  {
    preloadedState = {},
    // Automatically create a store instance if no store was passed in
    store = createStore({}),
    ...renderOptions
  } = {}
) {
  function Wrapper({ children }) {
    return <Provider store={store}>{children}</Provider>
  }

  // Return an object with the store and all of RTL's query functions
  return { store, ...render(ui, { wrapper: Wrapper, ...renderOptions }) }
}

module.exports = renderWithProviders
