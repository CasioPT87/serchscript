const { BrowserRouter, Route, Routes } = require('react-router-dom')
const React = require('react')
const ReactDOMClient = require('react-dom/client')
const setUpStore = require('../../store/setUp')
const { Provider } = require('react-redux')
const { Main } = require('./main')

const { MainFrame, Header, Footer } = require('../../components')

const replaceElements = () => {
  const store = setUpStore(window.__PRELOADED_STATE__)

  // Allow the passed state to be garbage-collected
  delete window.__PRELOADED_STATE__

  ReactDOMClient.hydrateRoot(
    document.getElementById('root'),
    <Provider store={store}>
      <MainFrame>
        <BrowserRouter>
          <Header />
          <Main />
          <Footer />
        </BrowserRouter>
      </MainFrame>
    </Provider>
  )
}

replaceElements()

module.export = { Main }
