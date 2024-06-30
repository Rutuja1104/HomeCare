/**
 * @props label: Label above the select dropdown (string)
 * @props name: Name for the element. Name will be same as the property that we want to change (string)
 * @props value: Default selected value of the dropdown
 * @props onSelectCb: Callback function after the option is selected from the dropdown. Callback function will recieve two parameters. First is the name of the element and second is the selectedOption object.
 * 
 * @props iconName: Name of the icon to be displayed on the card. (string)
 * @props familyName: Family name of the icon (string). 'fa' | 'fas' | 'fab' | 'vec'
 * @props isOpen: to handle the default open state of the dropdown (boolean)

* @props options: array of objects to render the dropdown items. Object consist of label and value. 
 *          Example: [{ label: "Option 1", value: "option 1" }, { label: "Option 2", value: "option 2" }]
 
* @props suffixProps: Object containing icon or text. Set icon if we want to render the icon and set text if we want to render any text. 
                      suffixProps will set the icon or text at the right side of the text field
                      Example: { icon: VEC_ICON_NAME.ICON_DROPDOWN_CARET } or { text: "+91" } 
 * 
 * @props prefixProps: Object containing icon or text. Set icon if we want to render the icon and set text if we want to render any text. 
                      prefixProps will set the icon or text at the left side of the text field
                      Example: { icon: VEC_ICON_NAME.ICON_DROPDOWN_CARET } or { text: "+91" } 
 */

import React, { useEffect, useRef, useState } from 'react';
import TextInput from '../../input/textinput/TextInput';
import TxDropdown from '../txdropdown/TxDropdown';
import { DropdownItem } from 'reactstrap';
import styles from "./SelectDropdown.styles"
import { VEC_ICON_NAME } from '../../icon/constants';


export default function SelectDropdown({
    label = "",
    options = [],
    placeHolder = "",
    name = "",
    value = { label: "", value: "" },
    isOpen = false,
    onSelectCb = () => { },
    suffixProps = { clearIcon: VEC_ICON_NAME.CLOSE },
    prefixProps = {},
    hideBorder = false,
    customInputStyles = {},
    rules = {},
    errors = {},
    formSubmitted,
    clearSearchTextCb = () => { },
    onDropdownTouchedToBottomCb = () => { },
    onSearchInputChangeCb = () => { },
    disabled = false,
    isClearable = true,
    dropdownMenuStyle = {},
    dropdownContainerStyles = {},
    physicians =false
}) {

    const [isDropdownOpen, setIsDropdownOpen] = useState(isOpen);
    const [searchText, setSearchText] = useState("");
    const inputRef = useRef(null);

    useEffect(() => {
        if (isDropdownOpen) {
            inputRef.current.focus();
        } else {
            setSearchText("")
            clearSearchTextCb()
        }
    }, [isDropdownOpen])

    const toggle = () => {
        if (!disabled) {
            setIsDropdownOpen(prev => !prev)
        }
    };

    const onChangehandler = (option) => {
        setSearchText("")
        onSelectCb(name, option); 
        setIsDropdownOpen(false);
    };
    const DropdownToggleComponent = (
        <>
            <TextInput
                label={label}
                name={name}
                placeHolder={placeHolder}
                value={searchText ? searchText : value.label}
                prefixProps={prefixProps}
                suffixProps={{ ...suffixProps, clearIcon: VEC_ICON_NAME.CLOSE, suffixClearIconCb: () => onChangehandler({ label: "", value: "" }) }}
                customStyles={{ ...styles.input, ...(disabled ? styles.disabledStyle : {}), ...customInputStyles }}
                hideBorder={hideBorder}
                rules={rules}
                errors={errors}
                formSubmitted={formSubmitted}
                onChangeCb={() => setIsDropdownOpen(true)}
                disabled={disabled}
                isClearable={isClearable}
            />
        </>
    )

    const filteredOptions = options.filter(o => physicians?o.label && o.label.toLowerCase():o.label && o.label.toLowerCase().startsWith(searchText.toLowerCase()));

    const DropdownOptionsComponent = <>

        {filteredOptions.map((o, idx) => (
            <DropdownItem key={idx} onClick={() => onChangehandler(o)} style={styles.dropdownItem}>{o.label}</DropdownItem>
        ))}
    </>

    return (
        <>
            <input
                ref={inputRef}
                value={searchText}
                onChange={(e) => {
                    setSearchText(e.target.value)
                    onSearchInputChangeCb(e)
                }}
                type='text'
                style={styles.searchInput}
                disabled={disabled}
            />

            <TxDropdown
                isOpen={isDropdownOpen}
                toggleCb={toggle}
                dropdownMenuStyle={{ ...styles.dropdownMenu, ...dropdownMenuStyle }}
                DropdownToggleComponent={DropdownToggleComponent}
                DropdownMenuComponent={filteredOptions.length ? DropdownOptionsComponent : undefined}
                onDropdownTouchedToBottomCb={onDropdownTouchedToBottomCb}
                dropdownContainerStyles={dropdownContainerStyles}
            />
        </>
    );
}