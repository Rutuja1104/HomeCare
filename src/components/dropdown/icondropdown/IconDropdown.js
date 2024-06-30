/**
 * @props label: Text of the label (string)
 * @props iconName: Name of the icon to be displayed on the card. (string)
 * @props familyName: Family name of the icon (string). 'fa' | 'fas' | 'fab' | 'vec'
 * @props isOpen: to handle the default open state of the dropdown (boolean)
 * @props dropdownItems: array of objects to render the dropdown items. Object consist of itemName, onClick handler or isDivider key to render the divider. 
 *        ( [{ itemName: "Item 1", onClick: () => {} }, { itemName: "Item 2", onClick: () => {} }, { isDivider: true }] )
 */

import React, { useState } from 'react';
import { DropdownItem } from 'reactstrap';
import TxDropdown from '../txdropdown/TxDropdown';
import { ShowForAllowedPermissionsOnly } from '../../../businesslogic/wrappers/ShowForAllowedPermissionsOnly';


export default function IconDropdown({ label = "", iconName, familyName, isOpen = false, dropdownItems = [], dropdownContainerStyles = {}, styles = {}, dropdownMenuStyle = {}, showToggle = true }) {

    const [isDropdownOpen, setIsDropdownOpen] = useState(isOpen);

    const toggle = (e) => {
        e.stopPropagation();
        setIsDropdownOpen(prev => !prev)
    }

    const DropdownOptionsComponent = dropdownItems.map(e => (
        e.isDivider
            ? <DropdownItem divider />
            : 
            <ShowForAllowedPermissionsOnly toCheck={e?.permissions}>
                <DropdownItem onClick={(event) => {
                    e.onClick(e);
                    setTimeout(() => {
                        setIsDropdownOpen(false);
                    }, 100)
                }}>{e.itemName}</DropdownItem>
            </ShowForAllowedPermissionsOnly>
    ))

    return (
        <>
            <TxDropdown
                iconLabelProps={{ label, iconName, familyName, styles }}
                isOpen={isDropdownOpen}
                toggleCb={toggle}
                showToggle={showToggle}
                DropdownMenuComponent={DropdownOptionsComponent}
                dropdownContainerStyles={dropdownContainerStyles}
                dropdownMenuStyle={dropdownMenuStyle}
            />
        </>
    );
}