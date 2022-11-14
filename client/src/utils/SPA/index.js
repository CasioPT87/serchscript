const { BrowserRouter, Route, Routes } = require('react-router-dom')

const React = require('react')
const ReactDOM = require('react-dom/client')
const setUpStore = require('../../store/setUp')
const { Provider } = require('react-redux')

const {
  Articles,
  MainFrame,
  ArticleForm,
  Home,
  LoginForm,
  Header,
} = require('../../components')

const replaceElements = () => {
  const store = setUpStore(window.__PRELOADED_STATE__)

  // Allow the passed state to be garbage-collected
  delete window.__PRELOADED_STATE__

  const root = ReactDOM.createRoot(document.getElementById('root'))
  root.render(
    <Provider store={store}>
      <MainFrame>
        <BrowserRouter>
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="articles" element={<Articles />} />
            <Route path="admin/articles/new" element={<ArticleForm />} />
            <Route path="auth" element={<LoginForm />} />
          </Routes>
        </BrowserRouter>
      </MainFrame>
    </Provider>
  )
}

replaceElements()
