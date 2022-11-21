const React = require('react')

const MainFrame = ({ children }) => {
  return (
    <div className="stack">
      <main>{children}</main>
    </div>
  )
}

module.exports = MainFrame
