import { useEffect, useState } from 'react'
const _ = require('lodash')
import { useSelector, useDispatch } from 'react-redux'
import { AnyAction } from 'redux'
import { ThunkDispatch } from 'redux-thunk'
import { ServerRequest } from '../../store/async/index'
import { StoreType } from '../../store/state/index'
const Card = require('./card/index.tsx')
const Searcher = require('../searcher/index.tsx')
const Paginator = require('../paginator/index.tsx')
const { article: articleAsync } = require('../../store/async/index.ts')

const listArticles = articleAsync.list as ServerRequest['article']['list']

const Articles = () => {
  const limit = 5
  const dispatch = useDispatch()
  const [searchText, setSearchText] = useState<string>('')
  const articles = useSelector((state: StoreType) => state.articles)

  const fetchArticleList = ({
    page,
    text,
  }: {
    page: number
    text: string
  }): void => {
    const dispatchThunk: ThunkDispatch<StoreType, unknown, AnyAction> = dispatch
    dispatchThunk(listArticles({ searchParams: { page, limit, text } }))
  }

  const search = (text: string): void => {
    fetchArticleList({ page: 0, text })
    setSearchText(text)
  }

  const clearSearchText = () => {
    fetchArticleList({ page: 0, text: '' })
    setSearchText('')
  }

  useEffect(() => {
    if (_.isEmpty(articles.list)) {
      fetchArticleList({ page: 0, text: '' })
    }
  }, [])

  const cards = () => {
    if (articles?.list?.docs && articles.list.docs.length > 0) {
      return (
        <ul className="articles__list">
          {articles.list.docs.map(article => (
            <Card key={article._id} article={article} />
          ))}
        </ul>
      )
    }
    return <div className="articles__message-default">No articles found</div>
  }

  return (
    <div className="articles">
      <Searcher clear={clearSearchText} search={search} />
      {cards()}
      <Paginator
        fetchPage={(page: number) =>
          fetchArticleList({ page, text: searchText })
        }
        limit={limit}
      />
    </div>
  )
}

module.exports = Articles
