const React = require('react')
const { useSelector } = require('react-redux')
const { Link } = require('react-router-dom')
const Warning = require('../../warning')

const Card = ({ article }) => {
  const logged = useSelector(state => state.logged)

  if (!article) return null

  return (
    <li key={article._id} className="card">
      <Link to={`/articles/${article.titleId}`}>
        <Warning show={article.hidden} text="article hidden for the public" />
        <div>
          <h3 className="card__title">{article.title}</h3>
          <p className="card__text">{article.description}</p>
        </div>
      </Link>
    </li>
  )
}

module.exports = Card
