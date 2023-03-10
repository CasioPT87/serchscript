import React, { SyntheticEvent, useState } from 'react'

type Props = {
  search: (text: string) => void
  clear: () => void
}

const Searcher = ({ search, clear }: Props) => {
  const [text, setText] = useState('')

  const submit = (e: SyntheticEvent) => {
    e.preventDefault()
    search(text)
  }

  return (
    <div role="search" className="searcher">
      <button
        className="searcher__button searcher__button--search"
        onClick={() => {
          search(text)
        }}
      >
        <img src="search.png" />
      </button>

      <form onSubmit={submit}>
        <input
          type="text"
          className="searcher__input"
          value={text}
          onChange={ev => {
            setText(ev.target.value)
          }}
          placeholder="filter by title"
        />
      </form>

      <button
        className="searcher__button searcher__button--clear"
        onClick={() => {
          setText('')
          clear()
        }}
      >
        <img src="clear.png" />
      </button>
    </div>
  )
}

module.exports = Searcher
