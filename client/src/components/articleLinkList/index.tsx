import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { StoreType } from '../../store/state/index'
import { Link } from 'react-router-dom'
const { article: articleAsync } = require('../../store/async/index.ts')
import type { ServerRequest } from '../../store/async/index'

const createPath = (titleId: string): string | null => {
  if (titleId) return `/articles/${titleId}`
  return null
}

const showArticleLinkList =
  articleAsync.links as ServerRequest['article']['links']

const ArticleLinkList = ({}) => {
  const dispatch = useDispatch()
  const articleLinkList = useSelector(
    (state: StoreType) => state.articleLinkList
  )

  useEffect(() => {
    if (!articleLinkList) dispatch(showArticleLinkList())
  }, [])

  if (!articleLinkList) return null

  return (
    <div className="articleListLink">
      <h3 className="articleListLink__title">All Articles</h3>
      <ul className="articleListLink__list">
        {articleLinkList.map(artLink => (
          <Link to={createPath(artLink.titleId)}>{artLink.title}</Link>
        ))}
      </ul>
    </div>
  )
}

module.exports = ArticleLinkList
