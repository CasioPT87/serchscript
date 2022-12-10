const React = require('react')
const { useSelector, useDispatch } = require('react-redux')
const parse = require('html-react-parser')
const { Link } = require('react-router-dom')
const { rawContentToHtml } = require('../../utils')
const { fetchArticle } = require('../../store/async')
const Comment = require('../comment')

const { useEffect, useState } = React

const Article = () => {
  const dispatch = useDispatch()
  const [content, setContent] = useState(null)
  const article = useSelector(state => {
    return state.article
  })
  const logged = useSelector(state => state.logged)

  useEffect(() => {
    if (typeof window !== 'undefined') {
      pathname = window.location.pathname
      const urlArticleTitleId = pathname.split('/')[2]
      if (!article || article.titleId !== urlArticleTitleId) {
        dispatch(fetchArticle(urlArticleTitleId))
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
    <div className="article article--light">
      {logged && (
        <div className="article__edit-button">
          <Link to={`/admin/articles/${article._id}/edit`}>Edit</Link>
        </div>
      )}
      {logged && article.hidden && (
        <h3 className="article__warning">
          this article is hidden for the public
        </h3>
      )}
      <h1 className="article__title">{article.title}</h1>
      <h3 className="article__description">{article.description}</h3>
      <div className="article__inner">
        {content && <div className="capitan">{parse(content)}</div>}
        {article.comments.map(comment => {
          return <Comment key={comment._id} comment={comment} />
        })}
      </div>

      <Comment comment={null} articleId={article._id} />
    </div>
  )
}

module.exports = Article
