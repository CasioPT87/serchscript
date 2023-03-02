import React, { useEffect, SyntheticEvent } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Action } from '../../store/actions/index'
import { ServerRequest } from '../../store/async/index'
import { StoreType } from '../../store/state/index'
const { auth: authAsync } = require('../../store/async/index.ts')
const actions = require('../../store/actions/index.ts')
const { useFormInput } = require('../../hooks/useFormInput')

const login = authAsync.login as ServerRequest['auth']['login']
const resetMessage = actions.resetMessage as Action

function LoginForm() {
  const dispatch = useDispatch()
  const userNameProps = useFormInput('')
  const userPasswordProps = useFormInput('')
  const message = useSelector((state: StoreType) => state.message.auth)

  useEffect(() => {
    dispatch(resetMessage())
  }, [])

  let handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault()
    dispatch(
      login({
        data: { name: userNameProps.value, password: userNameProps.value },
      })
    )
  }

  return (
    <div className="login login--light">
      <form className="form" onSubmit={handleSubmit}>
        <input
          className="form__input form__input--small"
          type="text"
          placeholder="username"
          {...userNameProps}
        />
        <input
          className="form__input form__input--small"
          type="password"
          placeholder="your password"
          {...userPasswordProps}
        />

        <button className="form__submit" type="submit">
          Send credentials
        </button>
        {!!message && (
          <div className="form__input  form__input--small form__message">
            {message}
          </div>
        )}
      </form>
    </div>
  )
}

module.exports = LoginForm
