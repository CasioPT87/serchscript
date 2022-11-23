const React = require('react')
const { useSelector } = require('react-redux')
const { convertToHTML } = require('draft-convert')
const { convertFromRaw } = require('draft-js')
const parse = require('html-react-parser')

const { useEffect, useState } = React

const Articles = () => {
  const [content, setContent] = useState(null)
  const article = useSelector(state => {
    return state?.article
  })

  useEffect(() => {
    if (article) {
      const cooked = convertFromRaw(JSON.parse(article.content))
      const preHtml = convertToHTML(cooked)
      const [start, rest] = preHtml.split('<figure>')
      const [url, end] = rest.split('</figure>')
      const contentHtml = start + `<img src="${url}" >` + end
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
