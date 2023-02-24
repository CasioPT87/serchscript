import React from 'react'
import { Link } from 'react-router-dom'
import { Route } from '../../../routes/index'

type Props = {
  route: Route
  children: JSX.Element
}

const NavItem = ({ route: { path, text }, children }: Props) => {
  return (
    <li className="header__item">
      {children || <Link to={path}>{text}</Link>}
    </li>
  )
}

module.exports = NavItem
