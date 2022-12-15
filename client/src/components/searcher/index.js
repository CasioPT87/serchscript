const React = require('react')

const { useState } = React

const Searcher = ({ search, clear }) => {
    const [text, setText] = useState('')
    return (
        <div className="searcher">
          <button className='searcher__button searcher__button--clear'>  </button>
          <input type='text' className="searcher__input" value={text} placeholder='search articles'/>
          <button className='searcher__button searcher__button--search'>  </button>
        </div>
        
    )
}

module.exports = Searcher