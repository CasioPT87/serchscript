const { Link } = require('react-router-dom')

const React = require('react')

const Header = () => {
  return (
    <div className="header">
      <Link to="/">
        <img
          src={'images/logo.png'}
          className="header__img"
          alt="flamyduck logo"
        />
      </Link>
      <div className="header__items">
        <Link to="/">Home</Link>
        <Link to="/articles">Articles</Link>
        <Link to="/admin/articles/new">new Article</Link>
      </div>
      <Link to="/auth">Auth</Link>
    </div>
  )
}

module.exports = Header
