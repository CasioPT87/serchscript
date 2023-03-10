import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import parse from 'html-react-parser'
import { Link } from 'react-router-dom'
import moment from 'moment'
const { rawContentToHtml } = require('../../utils/index.tsx')
const { article: articleAsync } = require('../../store/async/index.ts')
const Comments = require('../comments/index.tsx')
const Warning = require('../warning/index.tsx')

import type { StoreType } from '../../store/state/index'
import type { ServerRequest } from '../../store/async/index'

const showArticle = articleAsync.show as ServerRequest['article']['show']

const Article: React.FC = (): JSX.Element => {
  let contentHtml = null
  const dispatch = useDispatch()
  const article = useSelector((state: StoreType) => {
    return state.article
  })
  const logged = useSelector((state: StoreType) => state.logged)

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const pathname = window.location.pathname
      const articleTitleId = pathname.split('/')[2]
      if (!article || article.titleId !== articleTitleId) {
        dispatch(showArticle({ pathParams: { articleTitleId } }))
      }
    }
  }, [])

  if (article && article.content) {
    contentHtml = rawContentToHtml(JSON.parse(article.content))
  }

  if (!article || !contentHtml) return null

  const createdAt = moment(article.createdAt).format('MMMM YYYY')
  const updatedAt = moment(article.updatedAt).format('MMMM YYYY')

  return (
    <article className="article">
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
      <section>
        <h1 className="article__title">{article.title}</h1>
        <h3 className="article__description">{article.description}</h3>
        <p className="article_dates">
          <time>{createdAt}</time>
          {createdAt !== updatedAt && (
            <>
              {', last updated '}
              <time>{updatedAt}</time>
            </>
          )}
        </p>
      </section>
      <section className="article__inner">
        {contentHtml && (
          <div className="article__content">{parse(contentHtml)}</div>
        )}
        {article.comments && (
          <Comments comments={article.comments} articleId={article._id} />
        )}
      </section>
    </article>
  )
}

module.exports = Article
