import React, { useState } from 'react'
import { Collapse } from 'reactstrap'
import { Link } from 'react-router-dom'
import NavData from '../LayoutMenuData'
import AllowedUsersOnly from '../../libs/wrappers/AllowedRolesOnly'
import Avatar from '../../components/avatar/Avatar'
import Icons from '../../components/icon/Icon'
import { VEC_ICON_NAME } from '../../components/icon/constants'
import General from '../../libs/utility/General'

const VerticalLayout = props => {
    const [selectedIndex, setSelectedIndex] = useState(-1)
    const navData = NavData().props.children
    const token = General.getLocalStorageData("token")

    const toggle = (key) => {
        if (key === selectedIndex) {
            setSelectedIndex(-1)
        } else {
            setSelectedIndex(key)
        }
    }

    return (
        <React.Fragment>
            {(navData || []).map((item, key) => {
                return (
                    <React.Fragment key={key}>
                        {item.isHeader ? (
                            <li className='nav-header'>
                                <Avatar />
                                <span>{General.tokenDecode(token)?.firstName} {General.tokenDecode(token)?.lastName}</span>
                                {/* <Icons iconName={VEC_ICON_NAME.SIDEBAR_EXPAND_DOT_ICON} style={{ marginLeft: "53px", cursor: "pointer" }} /> */}
                            </li>
                        ) : (
                            <AllowedUsersOnly allowedRoles={item.roles}>
                                <li className={`nav-item ${item.isDivider ? 'nav-border-bottom' : ""} ${item.isUpperDivider ? 'nav-border-top' : ""}`}>
                                    <Link
                                        onClick={() => {
                                            toggle(key)
                                            item.click()
                                        }}
                                        className={`nav-link menu-link ${item.stateVariables ? 'selected-nav-item' : ''}`}
                                        to={item.link}
                                        data-bs-toggle='collapse'
                                    >
                                        <div className='nav-item-data'>
                                            <div>{item.icon}</div>
                                            <span data-key='t-apps' className='sidebar-label'>
                                                {item.label}
                                            </span>
                                        </div>
                                        {item.subItems && (
                                            <Icons iconName={VEC_ICON_NAME.ARROW_DOWN_ICON_SIDEBAR} rotateDeg={(item.stateVariables && key === selectedIndex) ? 180 : 0} />
                                        )}
                                    </Link>
                                    <Collapse
                                        className='menu-dropdown'
                                        isOpen={item.stateVariables && key === selectedIndex}
                                        id='sidebarApps'
                                    >
                                        <ul className='nav nav-sm flex-column test'>
                                            {/* subItms  */}
                                            {item.subItems &&
                                                (item.subItems || []).map((subItem, key) => {
                                                    return (
                                                        <AllowedUsersOnly allowedRoles={subItem.roles} key={key}>
                                                            {!subItem.isChildItem ? (
                                                                <li className='nav-item'>
                                                                    <Link
                                                                        to={subItem.link ? subItem.link : '/#'}
                                                                        className={`nav-link sub-menu-link ${subItem.stateVariables ? "selected-nav-item" : ""} `}
                                                                        onClick={subItem.click}
                                                                    >
                                                                        <div className='nav-item-data'>
                                                                            <div>{subItem.icon}</div>
                                                                            <span data-key='t-apps' className='sidebar-label label-class'>
                                                                                {subItem.label}
                                                                            </span>
                                                                        </div>
                                                                    </Link>
                                                                </li>
                                                            ) : (
                                                                <li className='nav-item'>
                                                                    <Link
                                                                        onClick={subItem.click}
                                                                        className='nav-link'
                                                                        to='/#'
                                                                        data-bs-toggle='collapse'
                                                                    >
                                                                        {' '}
                                                                        {props.t(subItem.label)}
                                                                    </Link>
                                                                    <Collapse
                                                                        className='menu-dropdown collapse show'
                                                                        in={subItem.stateVariables}
                                                                        id='sidebarApps'
                                                                    >
                                                                        <ul className='nav nav-sm flex-column'>
                                                                            {/* child subItms  */}
                                                                            {subItem.childItems &&
                                                                                (subItem.childItems || []).map(
                                                                                    (childItem, key) => (
                                                                                        <React.Fragment key={key}>
                                                                                            {!childItem.childItems ? (
                                                                                                <li className='nav-item'>
                                                                                                    <Link
                                                                                                        to={
                                                                                                            childItem.link
                                                                                                                ? childItem.link
                                                                                                                : '/#'
                                                                                                        }
                                                                                                        className='nav-link'
                                                                                                    >
                                                                                                        {childItem.label}
                                                                                                    </Link>
                                                                                                </li>
                                                                                            ) : (
                                                                                                <li className='nav-item'>
                                                                                                    <Link
                                                                                                        to='/#'
                                                                                                        className='nav-link'
                                                                                                        onClick={childItem.click}
                                                                                                        data-bs-toggle='collapse'
                                                                                                    >
                                                                                                        {childItem.label}{' '}
                                                                                                        <span
                                                                                                            className='badge badge-pill bg-danger'
                                                                                                            data-key='t-new'
                                                                                                        >
                                                                                                            New
                                                                                                        </span>
                                                                                                    </Link>
                                                                                                    <Collapse
                                                                                                        className='menu-dropdown'
                                                                                                        in={childItem.stateVariables}
                                                                                                        id='sidebaremailTemplates'
                                                                                                    >
                                                                                                        <ul className='nav nav-sm flex-column'>
                                                                                                            {childItem.childItems.map(
                                                                                                                (subChildItem, key) => (
                                                                                                                    <li
                                                                                                                        className='nav-item'
                                                                                                                        key={key}
                                                                                                                    >
                                                                                                                        <Link
                                                                                                                            to={subChildItem.link}
                                                                                                                            className='nav-link'
                                                                                                                            data-key='t-basic-action'
                                                                                                                        >
                                                                                                                            {subChildItem.label}{' '}
                                                                                                                        </Link>
                                                                                                                    </li>
                                                                                                                )
                                                                                                            )}
                                                                                                        </ul>
                                                                                                    </Collapse>
                                                                                                </li>
                                                                                            )}
                                                                                        </React.Fragment>
                                                                                    )
                                                                                )}
                                                                        </ul>
                                                                    </Collapse>
                                                                </li>
                                                            )}
                                                        </AllowedUsersOnly>
                                                    )
                                                })}
                                        </ul>
                                    </Collapse>
                                </li>
                            </AllowedUsersOnly>
                        )}
                    </React.Fragment>
                )

            })}
        </React.Fragment >
    )
}

export default VerticalLayout
