const React = require('react')
const { useState, useEffect } = require('react')
const { useSelector, useDispatch } = require('react-redux')
const ArticleCreator = require('../articleCreator')
const { createArticle, updateArticle } = require('../../store/async')

const MODE = {
  create: 'CREATE',
  update: 'UPDATE'
}

function articleForm() {
  const dispatch = useDispatch()
  const article = useSelector(store => store.article)
  const [title, setTitle] = useState('this is a fake title')
  const [mode, setMode] = useState(MODE.create)
  const [id, setId] = useState(null)
  const [description, setDescription] = useState('this is a fake description')
  const [content, setContent] = useState('this is a fake content')
  const [hidden, setHidden] = useState(false)
  const [message, setMessage] = useState('')

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const pathname = window.location.pathname
      const pathnameBits = pathname.split('/')
      const lastBit = pathnameBits.pop()
      if (lastBit === 'edit') {
        const id = pathnameBits.pop()
        setMode(MODE.update)
        setId(id)
      }
    }
  }, [])

  useEffect(() => {
    if (article) {
      if (mode === MODE.create) {
        reset()
      } else if (mode === MODE.update) {
        const { title, description, content } = article
        setTitle(title)
        setDescription(description)
        setContent(content)
      }
    }
  }, [article, mode])

  const reset = (message = '', error = null) => {
    if (error) {
      return setMessage(error.message)
    }
    setTitle('')
    setDescription('')
    setContent('')
    setMessage(message)
  }

  let handleSubmit = async e => {
    e.preventDefault()
    try {
      if (mode === 'CREATE') {
        await dispatch(
          createArticle({
            title,
            description,
            content,
          })
        )

        reset('article created')

      } else if (mode === 'UPDATE') {
        await dispatch(
          updateArticle({
            id,
            title,
            description,
            content,
          })
        )
      }

      reset('article updated')
      
    } catch (e) {
      return reset(null, e)
    }
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
