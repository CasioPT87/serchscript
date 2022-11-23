const React = require('react')
const { useState, useEffect } = require('react')
const { useSelector, useDispatch } = require('react-redux')
const ArticleCreator = require('../articleCreator')
const { createArticle } = require('../../store/async')

function articleForm() {
  const dispatch = useDispatch()
  const article = useSelector(store => store.article)
  const [title, setTitle] = useState('this is a fake title')
  const [description, setDescription] = useState('this is a fake description')
  const [content, setContent] = useState('this is a fake content')
  const [hidden, setHidden] = useState(false)
  const [message, setMessage] = useState('')

  useEffect(() => {
    if (article) {
      const { title, description, content } = article
      setTitle(title)
      setDescription(description)
      setContent(content)
    }
  }, [article])

  const reset = (error = null) => {
    if (error) {
      return setMessage(error.message)
    }
    setTitle('')
    setDescription('')
    setContent('')
    setMessage('article uploaded correctly')
  }

  let handleSubmit = async e => {
    e.preventDefault()
    try {
      await dispatch(
        createArticle({
          title,
          description,
          content,
        })
      )
    } catch (e) {
      return reset(e)
    }
    reset()
  }

  return (
    <div className="App">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={title}
          onChange={e => setTitle(e.target.value)}
        />
        <input
          type="text"
          value={description}
          onChange={e => setDescription(e.target.value)}
        />
        <ArticleCreator
          setText={setContent}
          articleContent={article?.content}
        />

        <button type="submit">Create</button>

        <div className="message">{message ? <p>{message}</p> : null}</div>
      </form>
    </div>
  )
}

module.exports = articleForm
