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

  return (
    <div className="header">
      <Link to="/">
        <img
          src={'/images/logo.png'}
          className="header__img"
          alt="flamyduck logo"
        />
      </Link>
      <div className="header__items">
        <Link to="/">Home</Link>
        <Link to="/articles">Articles</Link>
        <Link to="/admin/articles/new">new Article</Link>
      </div>
      {!logged && <Link to="/auth">Auth</Link>}
      {logged && (
        <a
          onClick={() => {
            dispatch(logout())
          }}
        >
          Logout
        </a>
      )}
    </div>
  )
}

module.exports = Header
