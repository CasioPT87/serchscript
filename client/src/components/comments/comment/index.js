const React = require('react')
const { useDispatch } = require('react-redux')
const {
  comment: { create: createComment },
} = require('../../../store/async')

const { useState, useEffect } = React

const Comment = ({ comment, articleId }) => {
  const dispatch = useDispatch()
  const [value, setValue] = useState(comment?.content || '')
  const [message, setMessage] = useState('')
  const messageCountDowns = []

  useEffect(() => {
    return messageCountDowns.forEach(messageCD => clearTimeout(messageCD))
  })

  const onChange = ev => {
    const value = ev.target.value
    setValue(value)
  }

  const onSubmit = async () => {
    const response = await dispatch(
      createComment({ data: { articleId, content: value } })
    )
    setMessage(response.message)
    setValue('')
    const timeout = setTimeout(() => setMessage(''), 5000)
    messageCountDowns.push(timeout)
  }

  return (
    <div className="comment">
      <textarea
        readOnly={!!comment}
        disabled={!!comment}
        onChange={onChange}
        value={value}
        placeholder="drop a comment :)"
        className="comment__field"
      />
      {message && <div className="comment__message">{message}</div>}
      {!comment && (
        <div className="">
          <button className="form__submit" onClick={onSubmit}>
            Send comment
          </button>{' '}
        </div>
      )}
    </div>
  )
}

module.exports = Comment
