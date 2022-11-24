const React = require('react')
const { useSelector, useDispatch } = require('react-redux')
const parse = require('html-react-parser')
const { Link } = require('react-router-dom')
const { rawContentToHtml } = require('../../utils')
const { fetchArticle } = require('../../store/async')

const { useEffect, useState } = React

const Article = () => {
  const dispatch = useDispatch()
  const [content, setContent] = useState(null)
  const article = useSelector(state => {
    return state.article
  })

  useEffect(() => {
    if (typeof window !== 'undefined') {
      pathname = window.location.pathname
      const urlArticleId = pathname.split('/')[2]
      if (!article || article._id !== urlArticleId) {
        dispatch(fetchArticle(urlArticleId))
      }
    }
  }, [])

  useEffect(() => {
    if (article) {
      const contentHtml = rawContentToHtml(JSON.parse(article.content))
      setContent(contentHtml)
    }
  }, [article])

  if (!article) return null

  return (
    <div>
      <Link to={`/admin/articles/${article._id}/edit`}>Edit</Link>
      <div className="capitan">{article.title}</div>
      <div className="capitan">{article.description}</div>
      {content && <div className="capitan">{parse(content)}</div>}
    </div>
  )
}

module.exports = Article
