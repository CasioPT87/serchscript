const React = require('react')
const parse = require('html-react-parser')
const { rawContentToHtml } = require('../../../utils')

const { useEffect, useState } = React

const Card = ({ article }) => {
  const [content, setContent] = useState(null)

  useEffect(() => {
    if (article) {
      const contentHtml = rawContentToHtml(JSON.parse(article.content))
      setContent(contentHtml)
    }
  }, [article])

  if (!article) return null

  return (
    <div>
      <div className="capitan">{article.title}</div>
      <div className="capitan">{article.description}</div>
      {content && <div className="capitan">{parse(content)}</div>}
    </div>
  )
}

module.exports = Card
