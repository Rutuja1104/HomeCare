/**
 * @props label: Label of the dropdown (string)

 * @props onSelectCb: Callback function after the option is selected from the dropdown. Callback function will recieve two parameters. First is the name of the element and second is the selectedOption object.

 * @props isOpen: to handle the default open state of the dropdown (boolean)

 * @props options: array of objects to render the dropdown items. Object consist of label, value and checked. 
 *          Example: [{ label: "Account payable", value: "1", checked: true }, { label: "Account payable 2", value: "2", checked: false }]
 
 * @props onChangeCheckboxCb: Callback function onChange of checkboxes. Callback function will recieve the updated array of options.
 * @props hideHoverStyles: boolean - to hide the hovering styles from the dropdown
 * @props buttonProps: array - To render the buttons after end of options list. Objects contains various properties of buttons.
        Example: {
        type: BUTTON_TYPE.PRIMARY_LIGHT_WITH_BORDER,
        children: "Apply",
        onClickCb: () => { },
        disabled: false,
    }
 */

import React, { useState } from 'react';
import TxDropdown from '../txdropdown/TxDropdown';
import { DropdownItem } from 'reactstrap';
import styles from "./MultiSelectDropdownWLabel.styles"
import CheckboxWLabel from '../../checkbox/checkboxwlabel/CheckboxWLabel';
import Label from '../../label/Label';
import Button from '../../button/Button';
import { VEC_ICON_NAME } from '../../icon/constants';
import Icons from '../../icon/Icon';


export default function MultiSelectDropdownWLabel({
    label = "",
    options = [],
    isOpen = false,
    onChangeCheckboxCb = () => { },
    hideHoverStyles = true,
    customDropDownStyles = {},
    buttonProps = []
}) {

    const [isDropdownOpen, setIsDropdownOpen] = useState(isOpen);

    const toggle = () => setIsDropdownOpen(prev => !prev);

    const onChangehandler = (index) => {
        const newOptions = [...options];
        newOptions[index] = {
            ...newOptions[index],
            checked: !newOptions[index]?.checked
        }
        onChangeCheckboxCb(newOptions, index);
    };

    const Buttons = buttonProps.map(b => (
        <Button
            type={b.type}
            style={{ ...styles.button, ...b.style }}
            disabled={b.disabled}
            onClickCb={b.onClickCb}
            children={b.children}
            className={b.className}
        />
    ))

    const DropdownToggleComponent = (
        <>
            <Label customStyles={styles.label}>{label}</Label>
            <Icons iconName={VEC_ICON_NAME.CARET_DOWN} familyName="vec" />
        </>
    )

    const DropdownOptionsComponent = <>
        {options.map((o, idx) => (
            <DropdownItem>
                <div key={`${o.label}-${idx}`}>
                    <CheckboxWLabel
                        checked={o.checked}
                        label={o.label}
                        onChangeCb={() => onChangehandler(idx)}
                    />
                </div>
            </DropdownItem>
        ))}

        {buttonProps.length > 0 && <div style={styles.buttonsContainer}>
            {Buttons}
        </div>}
    </>

    return (
        <>
            <TxDropdown
                isOpen={isDropdownOpen}
                toggleCb={toggle}
                dropdownMenuStyle={{...styles.dropdownMenu, ...customDropDownStyles}}
                DropdownToggleComponent={DropdownToggleComponent}
                DropdownMenuComponent={DropdownOptionsComponent}
                hideHoverStyles={hideHoverStyles}
            />
        </>
    );
}