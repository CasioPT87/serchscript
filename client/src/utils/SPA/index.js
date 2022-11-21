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
  Footer,
} = require('../../components')

const replaceElements = () => {
  const store = setUpStore(window.__PRELOADED_STATE__)

  // Allow the passed state to be garbage-collected
  delete window.__PRELOADED_STATE__

  const root = ReactDOM.createRoot(document.getElementById('root'))
  root.render(
    <>
      <head>
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css?family=Roboto"
        ></link>
      </head>
      <body>
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
              <Footer />
            </BrowserRouter>
          </MainFrame>
        </Provider>
      </body>
    </>
  )
}

replaceElements()
