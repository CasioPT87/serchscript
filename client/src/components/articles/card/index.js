const React = require('react')
const { useSelector } = require('react-redux')
const { Link } = require('react-router-dom')

const Card = ({ article }) => {
  const logged = useSelector(state => state.logged)

  if (!article) return null

  return (
    <li key={article._id} className="card">
      <Link to={`/articles/${article.titleId}`}>
        <div>
          {logged && article.hidden && <h3>hidden for the public</h3>}
          <h3 className="card__title">{article.title}</h3>
          <p className="card__text">{article.description}</p>
        </div>
      </Link>
    </li>
  )
}

module.exports = Card
