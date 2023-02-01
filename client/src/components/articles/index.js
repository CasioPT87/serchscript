const React = require('react')
const _ = require('lodash')
const { useSelector, useDispatch } = require('react-redux')
const Card = require('./card')
const Searcher = require('../searcher')
const Paginator = require('../paginator')
const {
  article: { list: listArticles },
} = require('../../store/async')

const { useEffect, useState } = React

const Articles = () => {
  const limit = 5
  const dispatch = useDispatch()
  const [searchText, setSearchText] = useState('')
  const articles = useSelector(state => state.articles)

  const fetchArticleList = ({ page, text }) =>
    dispatch(listArticles({ searchParams: { page, limit, text } }))

  const search = text => {
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
        fetchPage={page => fetchArticleList({ page, text: searchText })}
        limit={limit}
      />
    </div>
  )
}

module.exports = Articles
