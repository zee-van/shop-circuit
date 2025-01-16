import React from 'react'
import { NavLink } from 'react-router-dom'

function LinkTab({path, title, children, style, handleOnClick}) {
  return (
    <NavLink onClick={handleOnClick} to={path} className={style}>
        {title}
        {children}
    </NavLink>
  )
}

export default LinkTab