const React = require('react')

const { useState } = React

const Searcher = ({ search, clear }) => {
  const [text, setText] = useState('')

  const submit = ev => {
    ev.preventDefault()
    search(text)
  }

  return (
    <div className="searcher">
      <button
        className="searcher__button searcher__button--clear"
        onClick={() => {
          setText('')
          clear()
        }}
      />

      <form onSubmit={submit}>
        <input
          type="text"
          className="searcher__input"
          value={text}
          onChange={ev => {
            setText(ev.target.value)
          }}
          placeholder="search articles"
        />
      </form>

      <button
        className="searcher__button searcher__button--search"
        onClick={() => {
          search(text)
        }}
      />
    </div>
  )
}

module.exports = Searcher
