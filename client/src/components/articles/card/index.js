const React = require('react')
const { useSelector } = require('react-redux')
const { Link } = require('react-router-dom')
const moment = require('moment')
const Warning = require('../../warning')

const Card = ({ article }) => {
  const logged = useSelector(state => state.logged)

  if (!article) return null

  const createdAt = article.createdAt

  return (
    <li key={article._id} className="card">
      <Link to={`/articles/${article.titleId}`}>
        <Warning show={article.hidden} text="article hidden for the public" />

        <h2 className="card__title">{article.title}</h2>
        <p className="card__text">{article.description}</p>

        <p className="card__date">{moment(createdAt).format('MM-DD-YYYY')}</p>
      </Link>
    </li>
  )
}

module.exports = Card
