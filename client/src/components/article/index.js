const React = require('react')
const { useSelector } = require('react-redux')
const parse = require('html-react-parser')
const { rawContentToHtml } = require('../../utils')

const { useEffect, useState } = React

const Articles = () => {
  const [content, setContent] = useState(null)
  const article = useSelector(state => {
    return state?.article
  })

  useEffect(() => {
    if (article) {
      const contentHtml = rawContentToHtml(JSON.parse(article.content))
      setContent(contentHtml)
    }
  }, [article])

  if (!article) return <div>que te den</div>
  return (
    <div>
      <div className="capitan">{article.title}</div>
      <div className="capitan">{article.description}</div>
      {content && <div className="capitan">{parse(content)}</div>}
    </div>
  )
}

module.exports = Articles
