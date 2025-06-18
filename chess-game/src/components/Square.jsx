import React from 'react'

function Square({ isDark, iconClass, onClick, isSelected }) {
    return (
        <div
        className={`square ${isDark ? 'dark' : 'light'} ${isSelected ? 'selected' : ''}`}
        onClick={onClick}
        >
        {iconClass && <i className={`${iconClass} piece`}></i>}
        </div>
    );
}

export default Square
