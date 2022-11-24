const React = require('react')
const { useState } = require('react')
const { useDispatch } = require('react-redux')
const { login } = require('../../store/async')

function loginForm() {
  const dispatch = useDispatch()
  const [name, setName] = useState('Papa Piquillo')
  const [password, setPassword] = useState('El secreto de la jojoya')
  const [message, setMessage] = useState('')

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
    <div className="App">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={name}
          onChange={e => setName(e.target.value)}
        />
        <input
          type="text"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />

        <button type="submit">Logueate</button>

        <div className="message">{message ? <p>{message}</p> : null}</div>
      </form>
    </div>
  )
}

module.exports = loginForm
