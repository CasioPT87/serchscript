const React = require('react')
const { useState } = require('react')
const { useDispatch } = require('react-redux')
const { auth: { login } } = require('../../store/async')

function loginForm() {
  const dispatch = useDispatch()
  const [name, setName] = useState('')
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState('Who are you, again?')

  let handleSubmit = async e => {
    e.preventDefault()
    try {
      const response = await dispatch(login({ name, password }))
      setMessage(response.message)
    } catch (err) {
      setMessage(err.message)
    }
  }

  return (
    <div className="login login--light">
      <form className="form" onSubmit={handleSubmit}>
        <input
          className="form__input"
          type="text"
          value={name}
          placeholder="username"
          onChange={e => setName(e.target.value)}
        />
        <input
          className="form__input"
          type="password"
          value={password}
          placeholder="your password"
          onChange={e => setPassword(e.target.value)}
        />

        <button className="form__submit" type="submit">
          Send credentials
        </button>
        <div className="form__input form__message">{message}</div>
      </form>
    </div>
  )
}

module.exports = loginForm
