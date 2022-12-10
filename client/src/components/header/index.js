const { Link } = require('react-router-dom')
const React = require('react')
const { useDispatch, useSelector } = require('react-redux')
const { getCookie } = require('../../utils')
const { setLogged } = require('../../store/actions')
const { logout } = require('../../store/async')
const NavItem = require('./navItem')
const routes = require('../../routes')

const { useEffect } = React

const Header = () => {
  const dispatch = useDispatch()
  const logged = useSelector(state => state.logged)

  useEffect(() => {
    const cookie = getCookie()
    if (cookie) dispatch(setLogged(true))
  }, [logged])

  const userLogout = () => {
    dispatch(logout())
  }

  return (
    <header className="header">
      <nav className="header__inner">
        <Link to="/">
          <img
            src={routes.homeIcon.src}
            className="header__icon"
            alt={routes.homeIcon.text}
          />
        </Link>
        <ul className="header__items">
          <NavItem route={routes.home} />
          <NavItem route={routes.articles.list} />

          {!logged && <NavItem route={routes.auth.login} />}
          {logged && <NavItem route={routes.articles.create} />}
          {logged && (
            <NavItem route={routes.articles.create}>
              <button className="button header__logout" onClick={userLogout}>
                Logout
              </button>
            </NavItem>
          )}
        </ul>
      </nav>
    </header>
  )
}

module.exports = Header
