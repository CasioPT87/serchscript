const React = require('react')
const { useSelector } = require('react-redux')
const { convertToHTML } = require('draft-convert')
const { convertFromRaw } = require('draft-js')
const parse = require('html-react-parser');

const Articles = () => {
  // const article = useSelector(state => {
  //   return state?.article
  // })
  const article = {
    title: 'apsidshfi',
    description: 'sdekfjhdkfjh'
  }
  const raw = JSON.parse('{"blocks":[{"key":"df1nk","text":"te odio","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}},{"key":"aqlag","text":"http://localhost:8880/64407a1a-32c7-4308-991d-dc310788e130.png","type":"atomic","depth":0,"inlineStyleRanges":[],"entityRanges":[{"offset":0,"length":63,"key":0}],"data":{}},{"key":"c6c57","text":"","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{"0":{"type":"IMAGE","mutability":"IMMUTABLE","data":{"file":"64407a1a-32c7-4308-991d-dc310788e130.png","id":"64407a1a-32c7-4308-991d-dc310788e130"}}}}')
  console.log({ raw })
  const cooked = convertFromRaw(raw)
  console.log({ cooked })
  const preHtml = convertToHTML(cooked)
  const [start, rest] = preHtml.split('<figure>')
  const [url, end] = rest.split('</figure>')
  const html = start + `<img src="${url}" >` + end
  
  console.log({ html })

  if (!article) return <div>que te den</div>
  return (
    <div>
      <div className="capitan">{article.title}</div>
      <div className="capitan">{article.description}</div>
      <div className="capitan">{parse(html)}</div>
    </div>
  )
}

module.exports = Articles
