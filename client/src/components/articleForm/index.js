const React = require('react')
const { useState, useEffect } = require('react')
const { useSelector, useDispatch } = require('react-redux')
const ArticleCreator = require('../articleCreator')
const CheckBox = require('../checkbox')
const { createArticle, updateArticle } = require('../../store/async')

const MODE = {
  create: 'CREATE',
  update: 'UPDATE',
}

const getDispatchAction = mode => {
  switch (mode) {
    case MODE.create:
      return createArticle
    case MODE.update:
      return updateArticle
    default:
      return () => {}
  }
}

function articleForm() {
  const dispatch = useDispatch()
  const article = useSelector(store => store.article)
  const [title, setTitle] = useState('')
  const [mode, setMode] = useState(MODE.create)
  const [id, setId] = useState(null)
  const [description, setDescription] = useState('')
  const [content, setContent] = useState('')
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
        const { title, description, content, hidden } = article
        setTitle(title)
        setDescription(description)
        setContent(JSON.parse(content))
        setHidden(hidden)
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
    setHidden(false)
  }

  let handleSubmit = async e => {
    e.preventDefault()
    try {
      const response = await dispatch(
        getDispatchAction(mode)({
          id,
          title,
          description,
          content,
          hidden,
        })
      )

      reset(response?.message || 'action succeeded')
    } catch (e) {
      return reset(null, e)
    }
  }

  return (
    <div className="article-form article-form--light">
      <form className="form" onSubmit={handleSubmit}>
        <CheckBox checked={hidden} onChange={setHidden} text="Hidden" />
        <input
          type="text"
          value={title}
          onChange={e => setTitle(e.target.value)}
          className="form__input"
          placeholder="title for the article"
        />
        <input
          type="text"
          value={description}
          onChange={e => setDescription(e.target.value)}
          className="form__input"
          placeholder="description for the article"
        />
        <ArticleCreator
          setText={setContent}
          articleContent={article?.content}
        />

        <button className="form__submit" type="submit">
          Create
        </button>

        <div className="message">{message ? <p>{message}</p> : null}</div>
      </form>
    </div>
  )
}

module.exports = articleForm
