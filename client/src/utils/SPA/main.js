const React = require('react')
const { Route, Routes } = require('react-router-dom')
const {
  Articles,
  Article,
  ArticleForm,
  LoginForm,
} = require('../../components')

const Main = () => {
  return (
    <main>
      <Routes>
        <Route path="/" element={<Articles />} />
        <Route path="articles/:titleId" element={<Article />} />
        <Route path="admin/articles/new" element={<ArticleForm.create />} />
        {/* <Route path="articles/load" element={<ArticleLoad />} /> just to load all data from prev app -RIP flamyduck -*/}
        <Route path="admin/articles/:id/edit" element={<ArticleForm.edit />} />
        <Route path="auth" element={<LoginForm />} />
      </Routes>
    </main>
  )
}

module.exports = { Main }
