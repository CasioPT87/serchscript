const React = require('react')
const { useState } = require('react')
const { useDispatch } = require('react-redux')
const { login } = require('../../store/async')

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
    <div className="login login--dark">
      <form className="login__form" onSubmit={handleSubmit}>
        <input
          className="login__field login__field--pile-separation login__field--clickable"
          type="text"
          value={name}
          placeholder="username"
          onChange={e => setName(e.target.value)}
        />
        <input
          className="login__field login__field--pile-separation login__field--clickable"
          type="password"
          value={password}
          placeholder="your password"
          onChange={e => setPassword(e.target.value)}
        />

        <button
          className="login__field login__submit login__field--clickable"
          type="submit"
        >
          Send credentials
        </button>
        <div className="login__field login__message">{message}</div>
      </form>
    </div>
  )
}

module.exports = loginForm
