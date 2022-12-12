const { BrowserRouter, Route, Routes } = require('react-router-dom')

const React = require('react')
const ReactDOM = require('react-dom/client')
const setUpStore = require('../../store/setUp')
const { Provider } = require('react-redux')

const {
  Articles,
  Article,
  ArticleLoad,
  MainFrame,
  ArticleForm,
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
    <Provider store={store}>
      <MainFrame>
        <BrowserRouter>
          <Header />
          <Routes>
            <Route path="/" element={<Articles />} />
            <Route path="articles/:titleId" element={<Article />} />
            <Route path="admin/articles/new" element={<ArticleForm.create />} />
            {/* <Route path="articles/load" element={<ArticleLoad />} /> just to load all data from prev app -RIP flamyduck -*/} 
            <Route
              path="admin/articles/:id/edit"
              element={<ArticleForm.edit />}
            />
            <Route path="auth" element={<LoginForm />} />
          </Routes>
          <Footer />
        </BrowserRouter>
      </MainFrame>
    </Provider>
  )
}

replaceElements()
