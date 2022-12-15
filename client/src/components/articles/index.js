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
  const [message, setMessage] = useState('')
  const [searchText, setSearchText] = useState('')
  const articles = useSelector(state => state.articles)
  const fetchArticlesByPage = page =>
    dispatch(listArticles({ page, limit, text: searchText }))
  const search = text => {
    dispatch(listArticles({ page: 0, limit, text }))
    setSearchText(text)
  }

  const clearSearchText = () => {
    dispatch(listArticles({ page: 0, limit, text: '' }))
    setSearchText('')
  }

  useEffect(() => {
    if (_.isEmpty(articles.list)) {
      fetchArticlesByPage(1).then(response => {
        if (response.error) setMessage(response.message)
      })
    }
  }, [])

  if (_.isEmpty(articles.list) || articles.list?.docs.length === 0)
    return <div>there is no articles yet</div>

  return (
    <div className="articles articles--bg-light">
      <Searcher clear={clearSearchText} search={search} />
      {message && <div className="message">{message}</div>}
      <ul className="articles__list">
        {articles.list.docs.map(article => (
          <Card key={article._id} article={article} />
        ))}
      </ul>
      <Paginator fetchPage={fetchArticlesByPage} limit={limit} />
    </div>
  )
}

module.exports = Articles
