const React = require('react')

const MainFrame = ({ children }) => {
  return (
    <div className="container">
      <div className="content-body">
        <main className="content">{children}</main>
      </div>
      <footer className="footer">Footer</footer>
    </div>
  )
}

module.exports = MainFrame
