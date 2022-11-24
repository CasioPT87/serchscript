const React = require('react')
const { useDispatch } = require('react-redux')
const { createComment } = require('../../store/async')

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
      createComment({ articleId, content: value })
    )
    setMessage(response.message)
    setValue('')
    const timeout = setTimeout(() => setMessage(''), 5000)
    messageCountDowns.push(timeout)
  }

  return (
    <>
      <textarea
        readOnly={!!comment}
        disabled={!!comment}
        onChange={onChange}
        value={value}
        placeholder="drop a comment :)"
      />
      {message && <div>{message}</div>}
      {!comment && (
        <div>
          <button onClick={onSubmit}>Send comment</button>{' '}
        </div>
      )}
    </>
  )
}

module.exports = Comment
