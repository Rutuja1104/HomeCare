import React from 'react'
import { useSelector } from 'react-redux'
import { componentKey } from './LayoutSlice'

const NonAuthLayout = ({ children }) => {
    const { nonAuthLayoutHeader } = useSelector(state => state[componentKey])
    return (
        <React.Fragment>
            <div className='non-auth-container'>
                <div className='header'>
                    <span className='heading'>{nonAuthLayoutHeader || ""}</span>
                </div>
                <div className='body-content'>
                    <div className='content'>
                        {children}
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
}

export default NonAuthLayout
