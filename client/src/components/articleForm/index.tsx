import { useState, useEffect, SyntheticEvent } from 'react'
import { useSelector, useDispatch } from 'react-redux'
const ArticleCreator = require('../articleCreator')
const CheckBox = require('../checkbox')
const {
  article: articleAsync,
  image: imageAsync,
} = require('../../store/async/index.ts')
const {
  setArticleMessage,
  resetMessage,
} = require('../../store/actions/index.ts')

import type { StoreType } from '../../store/state/index'
import type { ServerRequest } from '../../store/async/index'
import type { ThunkDispatch } from 'redux-thunk'
import { Article } from '../../store/types/entities/index'
import { Content } from '../../store/types/async/index'
import { AnyAction } from 'redux'

const createArticle = articleAsync.create as ServerRequest['article']['create']
const updateArticle = articleAsync.update as ServerRequest['article']['update']
const listArticles = articleAsync.list as ServerRequest['article']['list']
const uploadImages = imageAsync.upload as ServerRequest['image']['upload']

const MODE = {
  create: 'CREATE',
  edit: 'EDIT',
} as const

type ModeOptions = typeof MODE[keyof typeof MODE]

const getDispatchAction = (mode: ModeOptions) => {
  switch (mode) {
    case MODE.create:
      return createArticle
    case MODE.edit:
      return updateArticle
    default:
      return updateArticle
  }
}

const getButtonText = (mode: ModeOptions) => {
  switch (mode) {
    case MODE.create:
      return 'Create'
    case MODE.edit:
      return 'Update'
    default:
      return 'Create'
  }
}

const getRichTextDataFeed = ({
  mode,
  article,
}: {
  mode: ModeOptions
  article: Article
}) => {
  switch (mode) {
    case MODE.create:
      return null
    case MODE.edit:
      return article?.content
    default:
      return null
  }
}

const ArticleForm = (mode: ModeOptions) => () => {
  const dispatch = useDispatch()
  const article = useSelector((state: StoreType) => state.article)
  const message = useSelector((store: StoreType) => store.message.article)
  const [title, setTitle] = useState<string>('')
  const [description, setDescription] = useState<string>('')
  const [content, setContent] = useState<'' | Content>('')
  const [hidden, setHidden] = useState<boolean>(false)

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

  let handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault()

    if (!title || !description || !content) {
      return dispatch(
        setArticleMessage(
          `Error: Article lacking title, description or content`
        )
      )
    }

    const dispatchThunk: ThunkDispatch<StoreType, unknown, AnyAction> = dispatch
    const imagesUploadedData = await dispatchThunk(uploadImages(content))
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
