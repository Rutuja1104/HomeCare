import React from 'react'
import Header from './VerticalLayout/Header'
import Sidebar from './VerticalLayout/Sidebar'

const index = props => {
    return (
        <React.Fragment>
            <div id='layout-wrapper'>
                <Header />
                <Sidebar />
                <div className='main-content'>
                    <div className='page-content'>
                        {props.children}
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
}

export default index
