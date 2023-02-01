const React = require('react')
const { useSelector, useDispatch } = require('react-redux')
const parse = require('html-react-parser')
const { Link } = require('react-router-dom')
const { rawContentToHtml } = require('../../utils')
const {
  article: { show: showArticle },
} = require('../../store/async')
const Comments = require('../comments')
const Warning = require('../warning')

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
      const pathname = window.location.pathname
      const articleTitleId = pathname.split('/')[2]
      if (!article || article.titleId !== articleTitleId) {
        dispatch(showArticle({ pathParams: { articleTitleId } }))
      }
    }
  }, [])

  useEffect(() => {
    if (article && article.content) {
      const contentHtml = rawContentToHtml(JSON.parse(article.content))
      setContent(contentHtml)
    }
  }, [article])

  if (!article || !content) return null

  return (
    <div className="article">
      {logged && (
        <div className="article__edit-button">
          <Link to={`/admin/articles/${article._id}/edit`}>Edit</Link>
        </div>
      )}
      {logged && (
        <Warning
          show={article.hidden}
          text="this article is currently hidden"
        />
      )}
      <h1 className="article__title">{article.title}</h1>
      <h3 className="article__description">{article.description}</h3>
      <div className="article__inner">
        {content && <div className="article__content">{parse(content)}</div>}
        {article.comments && (
          <Comments comments={article.comments} articleId={article._id} />
        )}
      </div>
    </div>
  )
}

module.exports = Article
