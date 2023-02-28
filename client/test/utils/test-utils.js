const React = require('react')
const { render } = require('@testing-library/react')
const createStore = require('../../src/store/setUp')
const { Provider } = require('react-redux')
const { App } = require('../../src/utils/SPA')
const { MemoryRouter } = require('react-router-dom')

function renderWithProviders(
  ui,
  {
    preloadedState = {},
    // Automatically create a store instance if no store was passed in
    store = createStore(preloadedState),
    ...renderOptions
  } = {}
) {
  function Wrapper({ children }) {
    return (
      <Provider store={store}>
        <BrowserRouter>{children}</BrowserRouter>
      </Provider>
    )
  }

  // Return an object with the store and all of RTL's query functions
  return { store, ...render(ui, { wrapper: Wrapper, ...renderOptions }) }
}

function renderWithRoutes(
  ui,
  {
    preloadedState = {},
    // Automatically create a store instance if no store was passed in
    store = createStore(preloadedState),
    initialEntries = ['/'],
    ...renderOptions
  } = {}
) {
  function Wrapper() {
    return (
      <Provider store={store}>
        <MemoryRouter initialEntries={initialEntries}>
          <App />
        </MemoryRouter>
      </Provider>
    )
  }

  // Return an object with the store and all of RTL's query functions
  return { store, ...render(ui, { wrapper: Wrapper, ...renderOptions }) }
}

module.exports = {
  renderWithProviders,
  renderWithRoutes,
}
