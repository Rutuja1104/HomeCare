import { Breadcrumbs } from '@mui/material'
import React from 'react'
import { Link } from 'react-router-dom'
import Icons from '../icon/Icon'
import { VEC_ICON_NAME } from '../icon/constants'

const Breadcrumb = ({ items }) => {
    return (
        <Breadcrumbs maxItems={3} aria-label="breadcrumb">
            <Link className='breadcrumb-link' to="#">
                <Icons iconName={VEC_ICON_NAME.BREADCRUMB_HOME_ICON} />
            </Link>

            {items?.map((link, key) => (
                <Link key={key} className='breadcrumb-link' to={link.to}>
                    {link.text}
                </Link>
            ))}
        </Breadcrumbs>
    )
}

export default Breadcrumb
