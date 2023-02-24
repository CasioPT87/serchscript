import React, { useState, useEffect, SyntheticEvent } from 'react'
import { useDispatch } from 'react-redux'
import { ThunkDispatch } from 'redux-thunk'
import { ServerRequest } from '../../../store/async/index'
import { StoreType } from '../../../store/state/index'
import { Article, CommentElement } from '../../../store/types/entities/index'
import type { AnyAction } from 'redux'
const { comment: commentAsync } = require('../../../store/async/index.ts')

const createComment = commentAsync.create as ServerRequest['comment']['create']

const Comment = ({
  comment,
  articleId,
}: {
  comment: CommentElement
  articleId: Article['_id']
}) => {
  const dispatch = useDispatch()
  const [value, setValue] = useState<string>(comment?.content || '')
  const [message, setMessage] = useState<string>('')
  const messageCountDowns: NodeJS.Timeout[] = []

  useEffect(() => {
    return messageCountDowns.forEach(messageCD => clearTimeout(messageCD))
  })

  const onChange = (e: SyntheticEvent) => {
    const value = (e.target as HTMLInputElement).value
    setValue(value)
  }

  const onSubmit = async () => {
    const dispatchThunk: ThunkDispatch<StoreType, unknown, AnyAction> = dispatch
    const response = await dispatchThunk(
      createComment({ data: { articleId, content: value } })
    )
    setMessage(response.message)
    setValue('')
    const timeout: NodeJS.Timeout = setTimeout(() => setMessage(''), 5000)
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
