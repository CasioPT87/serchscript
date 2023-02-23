const React = require('react')
const { useState, useEffect } = require('react')
const { useSelector, useDispatch } = require('react-redux')
const ArticleCreator = require('../articleCreator')
const CheckBox = require('../checkbox')
const {
  article: { create: createArticle, update: updateArticle, list: listArticles },
  image: { upload: uploadImages },
} = require('../../store/async/index.ts')
const { setArticleMessage, resetMessage } = require('../../store/actions')

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
  const message = useSelector(store => store.message.article)
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [content, setContent] = useState('')
  const [hidden, setHidden] = useState(false)

  useEffect(() => {
    dispatch(resetMessage())
  }, [])

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

    if (!title || !description || !content) {
      return dispatch(
        setArticleMessage(
          `Error: Article lacking title, description or content`
        )
      )
    }
    const imagesUploadedData = await dispatch(uploadImages(content))
    const dispatchAction = getDispatchAction(mode)
    const response = await dispatch(
      dispatchAction(imagesUploadedData)({
        pathParams: { articleId: article?._id },
        data: {
          title,
          description,
          content,
          hidden,
        },
      })
    )
    if (response) dispatch(listArticles({}))
  }

  return (
    <div className="article-form">
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

        <button
          className="form__submit form__submit--sticky-bottom"
          type="submit"
        >
          {getButtonText(mode)}
        </button>
      </form>
      {!!message && <div className="article-form__message">{message}</div>}
    </div>
  )
}

module.exports = {
  create: ArticleForm(MODE.create),
  edit: ArticleForm(MODE.edit),
}
