const { Link } = require('react-router-dom')
const React = require('react')
const { useDispatch, useSelector } = require('react-redux')
const { getCookie } = require('../../utils')
const { setLogged } = require('../../store/actions')
const { logout } = require('../../store/async')

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
            src={'/images/logo.png'}
            className="header__icon"
            alt="serchscript blog logo"
          />
        </Link>
        <ul className="header__items">
          <li className="header__item">
            <Link to="/">Home</Link>
          </li>
          <li className="header__item">
            <Link to="/articles">Articles</Link>
          </li>

          {!logged && (
            <li className="header__item">
              <Link to="/auth">Auth</Link>
            </li>
          )}
          {logged && (
            <li className="header__item">
              <Link to="/admin/articles/new">new Article</Link>
            </li>
          )}
          {logged && (
            <li className="header__item">
              <button className="button header__logout" onClick={userLogout}>
                Logout
              </button>
            </li>
          )}
        </ul>
      </nav>
    </header>
  )
}

module.exports = Header
