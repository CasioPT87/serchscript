const React = require('react')
const { useSelector } = require('react-redux')

const Articles = () => {
  const article = useSelector(state => {
    return state?.article
  })
  if (!article) return <div>que te den</div>
  return (
    <div>
      <div className="capitan">{article.title}</div>
      <div className="capitan">{article.content}</div>
    </div>
  )
}

module.exports = Articles
