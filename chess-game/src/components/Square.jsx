import React from 'react'

function Square({ isDark, iconClass }) {
  return (
    <div className ={`square ${isDark ? 'dark': 'light'}`}>
    {iconClass && <i className={`${iconClass} piece`} > </i>}
    </div>
  )
}

export default Square
