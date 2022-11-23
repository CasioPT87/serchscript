const React = require('react')
const { useSelector } = require('react-redux')
const { convertToHTML } = require('draft-convert')
const { convertFromRaw } = require('draft-js')

const Articles = () => {
  const article = useSelector(state => {
    return state?.article
  })
  const raw = JSON.parse(article.content)
  const cooked = convertFromRaw(raw)
  const html = convertToHTML(cooked)
  console.log({ html })
  if (!article) return <div>que te den</div>
  return (
    <div>
      <div className="capitan">{article.title}</div>
      <div className="capitan">{article.description}</div>
      <div className="capitan">convertToHTML(JSON.parse(article.content))</div>
    </div>
  )
}

module.exports = Articles
