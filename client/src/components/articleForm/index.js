const React = require('react')
const { useState, useEffect } = require('react')
const { useSelector, useDispatch } = require('react-redux')
const ArticleCreator = require('../articleCreator')
const CheckBox = require('../checkbox')
const { createArticle, updateArticle } = require('../../store/async')

const MODE = {
  create: 'CREATE',
  edit: 'EDIT',
}

const getDispatchAction = mode => {
  switch (mode) {
    case MODE.create:
      return createArticle
    case MODE.edit:
      return updateArticle
    default:
      return () => {}
  }
}

const getButtonText = mode => {
  switch (mode) {
    case MODE.create:
      return 'Create'
    case MODE.edit:
      return 'Update'
    default:
      return 'Create'
  }
}

const getRichTextDataFeed = ({ mode, article }) => {
  switch (mode) {
    case MODE.create:
      return null
    case MODE.edit:
      return article?.content
    default:
      return null
  }
}

const ArticleForm = mode => () => {
  const dispatch = useDispatch()
  const article = useSelector(store => store.article)
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [content, setContent] = useState('')
  const [hidden, setHidden] = useState(false)
  const [message, setMessage] = useState('')

  useEffect(() => {
    if (article && mode === MODE.edit) {
      const { title, description, hidden } = article
      setTitle(title)
      setDescription(description)
      setHidden(hidden)
    }
  }, [article, mode])

  let handleSubmit = async e => {
    e.preventDefault()
    try {
      const response = await dispatch(
        getDispatchAction(mode)({
          id: article?._id,
          title,
          description,
          content,
          hidden,
        })
      )

      setMessage(response?.message || 'action succeeded')
    } catch (e) {
      return setMessage(e.message)
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
          articleContent={getRichTextDataFeed({ mode, article })}
        />

        <button className="form__submit" type="submit">
          {getButtonText(mode)}
        </button>

        <div className="message">{message ? <p>{message}</p> : null}</div>
      </form>
    </div>
  )
}

module.exports = {
  create: ArticleForm(MODE.create),
  edit: ArticleForm(MODE.edit),
}
