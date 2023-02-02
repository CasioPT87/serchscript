const React = require('react')
const { useState, useEffect } = require('react')
const { useDispatch, useSelector } = require('react-redux')
const {
  auth: { login },
} = require('../../store/async')
const { resetMessage } = require('../../store/actions')

function loginForm() {
  const dispatch = useDispatch()
  const [name, setName] = useState('')
  const [password, setPassword] = useState('')
  const message = useSelector(state => state.message.auth)

  useEffect(() => {
    dispatch(resetMessage())
  }, [])

  let handleSubmit = async e => {
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
