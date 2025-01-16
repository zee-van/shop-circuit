import React from 'react'

function Button({children, title, btnStyle, handleOnClick, status}) {
  return (
    <>
    <button onClick={handleOnClick} className={btnStyle} disabled={status}>
        {title}
        {children}
    </button>
    </>
  )
}

export default Button