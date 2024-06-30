/**
 * @props iconLabelProps: Object which contains label, iconName, familyName for the IconLabel component
 * @props isOpen: to handle the default open state of the dropdown (boolean)
 * @props toggleCb: Toggle function to toggle the open state of the dropdown (callback function)
 * @props dropdownMenuStyle: Style object for DropdownMenu
 * @props DropdownToggleComponent: Component for DropdownToggle
 * @props DropdownMenuComponent: Component for rendering DropdownMenu items.
 * @props hideHoverStyles: boolean - to hide the hover styles from the dropdown
 */

import React, { useRef } from 'react';
import { Dropdown, DropdownToggle, DropdownMenu, UncontrolledDropdown } from 'reactstrap';
import './directcss/TxDropdown.scss'
import styles from "./TxDropdown.styles"
import IconLabel from '../../iconlabel/IconLabel';
import { VEC_ICON_NAME } from '../../icon/constants';
import Icons from '../../icon/Icon';

const CaretDropdown = <Icons iconName={VEC_ICON_NAME.CARET_DOWN} familyName="vec" />

const NoData = <div className='text-center'><label>No Data</label></div>

export default function TxDropdown({
    iconLabelProps = { label: "", iconName: "", familyName: "", styles: {} },
    isOpen = false,
    toggleCb = () => { },
    dropdownMenuStyle = {},
    DropdownToggleComponent = CaretDropdown,
    showToggle = true,
    DropdownMenuComponent = NoData,
    hideHoverStyles = false,
    dropdownContainerStyles = {},
    onDropdownTouchedToBottomCb = () => { }
}) {

    const dropdownRef = useRef()

    const handleDropdownScroll = (event) => {
        const { scrollTop, clientHeight, scrollHeight } = event.target;
        if (scrollTop + clientHeight === scrollHeight) {
            onDropdownTouchedToBottomCb()
        }
    };

    return (

        <div style={{ ...styles.iconDropdownContainer, ...dropdownContainerStyles }} onClick={toggleCb} >
            <Dropdown isOpen={isOpen} toggle={toggleCb} className={hideHoverStyles ? 'hide-hover' : 'select-dropdown'}>
                <div style={styles.dropDownContainer}>
                    {(iconLabelProps.label || iconLabelProps.iconName) &&
                        <IconLabel
                            text={iconLabelProps.label}
                            icon={iconLabelProps.iconName}
                            familyName={iconLabelProps.familyName}
                            labelStyles={{ ...styles.iconLabel, ...iconLabelProps.styles }}
                        />
                    }
                    <DropdownToggle tag="div" onClick={toggleCb}>
                        {showToggle && DropdownToggleComponent}
                    </DropdownToggle>
                </div>

                <DropdownMenu ref={dropdownRef} onScroll={handleDropdownScroll} style={dropdownMenuStyle}>
                    {DropdownMenuComponent}
                </DropdownMenu>

            </Dropdown>
        </div>

    );
}