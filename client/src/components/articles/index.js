const React = require('react')
const { useSelector, useDispatch } = require('react-redux')
const { Link } = require('react-router-dom')
const Card = require('./card')
const { fetchArticles } = require('../../store/async')

const { useEffect } = React

const Articles = () => {
  const dispatch = useDispatch()
  const articles = useSelector(state => state.articles)
  useEffect(() => {
    if (!articles) dispatch(fetchArticles())
  }, [articles])

  return (
    <ul className="articlesList">
      {articles.list.map(article => {
        return (
          <li onClick={() => {}}>
            <Link to={`/articles/${article._id}`}>
              <Card article={article} />
            </Link>
          </li>
        )
      })}
    </ul>
  )
}

module.exports = Articles
