import React from 'react'
import { NavLink, useLocation } from 'react-router-dom'

function LinkLists({path, title, children, hadleOnClick}) {
    const location = useLocation();
    const isActive = location.pathname === path;
    let styleClass = 'py-2 px-4 rounded-md w-full text-xl hover:bg-blue-800 hover:text-stone-200 transition-all';
    if(isActive){
         styleClass = 'py-2 px-4 rounded-md w-full text-xl bg-blue-600 hover:bg-blue-800 hover:text-stone-200 transition-all';
    }
  return (
    <NavLink to={path} onClick={hadleOnClick} className={styleClass}>
        {title}
        {children}
    </NavLink>
  )
}

export default LinkLists