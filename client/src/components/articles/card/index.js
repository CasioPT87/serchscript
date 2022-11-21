const React = require('react')
const { useSelector, useDispatch } = require('react-redux')
const { Link } = require('react-router-dom')

const { useEffect } = React

const Card = ({ article }) => {
  return (
    <div className="card" key={article.id}>
      <div className='card__title'>{article.title}</div>
      <div className='card__content'>{article.content}</div>
    </div>
  )
}

module.exports = Card
