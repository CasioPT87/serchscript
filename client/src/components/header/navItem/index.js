const { Link } = require('react-router-dom')
const React = require('react')

const NavItem = ({ route: { path, text }, children }) => {
  return (
    <li className="header__item">
      {children || <Link to={path}>{text}</Link>}
    </li>
  )
}

module.exports = NavItem
