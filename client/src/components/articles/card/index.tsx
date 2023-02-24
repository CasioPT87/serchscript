import { Link } from 'react-router-dom'
import moment from 'moment'
import { Article } from '../../../store/types/entities/index'
const Warning = require('../../warning/index.tsx')

const Card = ({ article }: { article: Article }) => {
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
