import React from 'react'
import { DropdownItem, DropdownMenu, DropdownToggle, UncontrolledDropdown } from 'reactstrap'
import Button from '../button/Button'
import { VEC_ICON_NAME } from '../icon/constants'
import { BUTTON_TYPE } from '../../libs/constant'

const ButtonDropdown = ({
    actions = [],
    buttonTitle = "More",
    variant = BUTTON_TYPE.PRIMARY_LIGHT_WITH_BORDER,
    className = "",
    icon = VEC_ICON_NAME.ARROW_DOWN_ICON
}) => {
    return (
        <UncontrolledDropdown className={`uncontrolled-dropdown ${className && className}`} >
            <DropdownToggle tag="div" className="btn btn-secondary" id="dropdownMenuButton">
                <Button styles={{ whiteSpace: 'nowrap', marginRight: "20px" }} prefixProps={{ icon }} variant={variant}>{buttonTitle}</Button>
            </DropdownToggle>
            <DropdownMenu>
                {actions.map((item, index) => (
                    <DropdownItem key={index} onClick={item.onClickCb}>{item.title}</DropdownItem>
                ))}
            </DropdownMenu>
        </UncontrolledDropdown>
    )
}

export default ButtonDropdown
