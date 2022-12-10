const React = require('react')
const { useSelector } = require('react-redux')
const { Link } = require('react-router-dom')

const Card = ({ article }) => {
  const logged = useSelector(state => state.logged)

  if (!article) return null

  return (
    <li key={article._id}>
      <Link to={`/articles/${article.titleId}`}>
        <div>
          {logged && article.hidden && <h3>hidden for the public</h3>}
          <div className="capitan">{article.title}</div>
          <div className="capitan">{article.description}</div>
        </div>
      </Link>
    </li>
  )
}

module.exports = Card
