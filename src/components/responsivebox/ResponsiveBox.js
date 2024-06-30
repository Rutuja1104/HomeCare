import React from 'react'

const ResponsiveBox = ({ children, size = 500 }) => {
    return (
        <div className='input-container' style={{ gridTemplateColumns: `repeat(auto-fit, minmax(min(100%, ${size}px), 1fr))` }}>
            {children}
        </div>
    )
}

export default ResponsiveBox
