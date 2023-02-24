import { Link } from 'react-router-dom'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import type { StoreType } from '../../store/state'
import { ServerRequest } from '../../store/async'
import { Action } from '../../store/actions'
const { getCookie } = require('../../utils/index.tsx')
const actions = require('../../store/actions/index.ts')
const { auth: authAsync } = require('../../store/async/index.ts')
const NavItem = require('./navItem/index.tsx')
const routes = require('../../routes/index.ts')

const setLogged = actions.setLogged as Action
const logout = authAsync.logout as ServerRequest['auth']['logout']

const Header = () => {
  const dispatch = useDispatch()
  const logged = useSelector((state: StoreType) => state.logged)

  useEffect(() => {
    const cookie = getCookie()
    if (cookie) dispatch(setLogged(true))
  }, [logged])

  const userLogout = () => {
    dispatch(logout())
  }

  return (
    <header className="header">
      <img src="/keyboard-header.jpg" />
      <nav className="header__inner">
        <Link to={routes.home.path}>
          <img
            src={routes.homeIcon.src}
            className="header__icon"
            alt={routes.homeIcon.text}
          />
        </Link>
        <ul className="header__items">
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
