const React = require('react')

const { useState } = React

const Searcher = ({ search, clear }) => {
  const [text, setText] = useState('')
  return (
    <div className="searcher">
      <button
        className="searcher__button searcher__button--clear"
        onClick={() => {
          setText('')
          clear()
        }}
      />
      <input
        type="text"
        className="searcher__input"
        value={text}
        onChange={ev => {
          ev.preventDefault()
          setText(ev.target.value)
        }}
        placeholder="search articles"
      />
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
