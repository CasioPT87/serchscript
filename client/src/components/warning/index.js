const React = require('react')

const Warning = ({ show, text }) => {
    if (!show) return null
    return (
      <h3 className='warning'>{text}</h3>
    )
  }

  module.exports = Warning