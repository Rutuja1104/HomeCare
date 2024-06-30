import React from 'react'

import Icons from '../../components/icon/Icon'

import { VEC_ICON_NAME } from '../../components/icon/constants'
import { NotesOutlined } from '@mui/icons-material'
import { useSelector } from 'react-redux'
import { componentKey } from '../LayoutSlice'

const Header = ({ headerClass }) => {

    const { headerLabel } = useSelector(state => state[componentKey])

    const toggleMenu = () => {
        document.querySelector('.navbar-menu')?.classList?.add('show-narbar-menu')
        document.querySelector('#page-topbar')?.classList?.add('add-opacity')
        document.querySelector('.page-content')?.classList?.add('add-opacity')
    }

    return (
        <React.Fragment>
            <header id='page-topbar' className={headerClass}>
                <div className='navbar-header'>
                    <div className='d-flex'>
                        <div className='me-2'>
                            <NotesOutlined className='hamburger-icon' onClick={() => toggleMenu()} />
                        </div>
                        <label className='header-label'>{headerLabel || ""}</label>
                    </div>
                    <div className='d-flex'>
                        <div className='d-flex d-none'>
                            <Icons iconName={VEC_ICON_NAME.HEADER_FILTER_ICON} />
                            <Icons iconName={VEC_ICON_NAME.HEADER_NOTIFICATION_ICON} />
                        </div>
                    </div>
                </div>
            </header>
        </React.Fragment>
    )
}

export default Header
