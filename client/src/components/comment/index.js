const React = require('react')
const { useSelector, useDispatch } = require('react-redux')
const parse = require('html-react-parser')
const { Link } = require('react-router-dom')
const { rawContentToHtml } = require('../../utils')
const { fetchArticle } = require('../../store/async')

const { useState } = React

const Comment = ({ comment }) => {
  const [value, setValue] = useState(comment?.content || '')

  const onChange = ev => {
    ev.preventDefault()
    const value = ev.target.value
    setValue(value)
  }

  return (
    <>
      <textarea
        readOnly={!!comment}
        disabled={!!comment}
        onChange={onChange}
        value={value}
        placeholder="leave me a comment :)"
      />
      {!comment && (
        <div>
          <button onClick={() => {}}>Send comment</button>{' '}
        </div>
      )}
    </>
  )
}

module.exports = Comment
