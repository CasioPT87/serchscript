import { useState, useEffect, SyntheticEvent } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Action } from '../../store/actions/index'
import { ServerRequest } from '../../store/async/index'
import { StoreType } from '../../store/state/index'
const { auth: authAsync } = require('../../store/async/index.ts')
const actions = require('../../store/actions/index.ts')

const login = authAsync.login as ServerRequest['auth']['login']
const resetMessage = actions.resetMessage as Action

function loginForm() {
  const dispatch = useDispatch()
  const [name, setName] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const message = useSelector((state: StoreType) => state.message.auth)

  useEffect(() => {
    dispatch(resetMessage())
  }, [])

  let handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault()
    dispatch(login({ data: { name, password } }))
  }

  return (
    <div className="login login--light">
      <form className="form" onSubmit={handleSubmit}>
        <input
          className="form__input form__input--small"
          type="text"
          value={name}
          placeholder="username"
          onChange={e => setName(e.target.value)}
        />
        <input
          className="form__input form__input--small"
          type="password"
          value={password}
          placeholder="your password"
          onChange={e => setPassword(e.target.value)}
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

module.exports = loginForm
