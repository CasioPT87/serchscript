const React = require('react')
const { useSelector, useDispatch } = require('react-redux')
const { fetchArticles } = require('../../store/async')
const { Link } = require('react-router-dom')

const { useEffect } = React

const Articles = () => {
  const dispatch = useDispatch()
  const articles = useSelector(state => state.articles)
  useEffect(() => {
    dispatch(fetchArticles)
  }, [])

  return (
    <ul>
      {articles.list.map(article => {
        return (
          <li onClick={() => {}}>
            <Link to={`/articles/${article._id}`}>
              <div key={article.id}>
                <div>
                {article.title}
                  </div>
                <div>
                {article.content}
                  </div>
              </div>
            </Link>
          </li>
        )
      })}
    </ul>
  )
}

module.exports = Articles
