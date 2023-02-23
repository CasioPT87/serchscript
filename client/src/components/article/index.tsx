import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import type { RootStateOrAny } from 'react-redux'
import parse from 'html-react-parser'
import { Link } from 'react-router-dom'
import { rawContentToHtml } from '../../utils'
const { article: articleAsync } = require('../../store/async/index.ts')
const Comments = require('../comments/index.tsx')
import Warning from '../warning'

const { show: showArticle } = articleAsync

const Article: React.FC = (): JSX.Element => {
  const dispatch = useDispatch()
  const [content, setContent] = useState<null | string>(null)
  const article = useSelector((state: RootStateOrAny) => {
    return state.article
  })
  const logged = useSelector((state: RootStateOrAny) => state.logged)

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
