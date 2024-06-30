import React from 'react'
import Icons from '../icon/Icon'

const Information = ({ iconName, children, className = "" }) => {
    return (
        <div className={`information-container ${className && className}`}>
            <div className='d-flex'>
                {iconName && <Icons style={{ marginRight: "10px" }} iconName={iconName} />}
                {children}
            </div>
        </div>
    )
}

export default Information
