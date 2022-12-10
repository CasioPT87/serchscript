const React = require('react')
const _ = require('lodash')
const { useSelector, useDispatch } = require('react-redux')
const { Link } = require('react-router-dom')
const Card = require('./card')
const Paginator = require('../paginator')
const { fetchArticles } = require('../../store/async')

const { useEffect } = React

const Articles = () => {
  const limit = 10
  const dispatch = useDispatch()
  const articles = useSelector(state => state.articles)
  const fetchArticlesByPage = page => dispatch(fetchArticles({ page, limit }))
  useEffect(() => {
    if (_.isEmpty(articles.list)) fetchArticlesByPage(1)
  }, [])

  if (_.isEmpty(articles.list) || articles.list?.docs.length === 0)
    return <div>there is no articles yet</div>

  return (
    <>
      <ul className="articlesList">
        {articles.list.docs.map(article => (
          <Card key={article._id} article={article} />
        ))}
      </ul>
      <Paginator fetchPage={fetchArticlesByPage} limit={limit} />
    </>
  )
}

module.exports = Articles
