import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { StoreType } from '../../store/state/index'
import { Link } from 'react-router-dom'
const { article: articleAsync } = require('../../store/async/index.ts')
import type { ServerRequest } from '../../store/async/index'

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
    <ul className="articleListLink">
      {articleLinkList.map(artLink => (
        <Link to={artLink.path}>{artLink.display}</Link>
      ))}
    </ul>
  )
}

module.exports = ArticleLinkList
