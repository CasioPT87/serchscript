const React = require('react')
const { useSelector, useDispatch } = require('react-redux')
const { useNavigation } = require('react-router-dom')
const { fetchArticles } = require('../../store/async')

const { useEffect } = React

const Articles = () => {
  const dispatch = useDispatch()
  const navigate = useNavigation()
  const articles = useSelector(state => state.articles)
  useEffect(() => {
    dispatch(fetchArticles)
  }, [])

  return (
    <ul>
      {articles.list.map(article => {
        return (
          <li onClick={() => navigate(`/article/${article.id}`)}>
          <div key={Math.random()} className="killo">
            {article.title}
          </div>
          </li>
        )
      })}
    </ul>
  )
}

module.exports = Articles
