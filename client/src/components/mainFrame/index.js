const React = require('react')

const MainFrame = props => {
  return (
    <div className="container">
      <header className="header">Header</header>
      <div className="content-body">
        <main className="content">{props.children}</main>
        <nav className="sidenav">Nav</nav>
        <aside className="ads">Ads</aside>
      </div>
      <footer className="footer">Footer</footer>
    </div>
  )
}

module.exports = MainFrame
