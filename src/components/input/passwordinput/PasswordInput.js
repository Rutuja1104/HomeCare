/**
 * @props type - Type of the input eg. text, email, password.
 * @props name: Name for the element. Name will be same as the property that we want to change (string)
 * @props onChangeCb - Callback Function which recieves event object whenever input field value changes

 * @props suffixProps: Object containing icon or text. Set icon if we want to render the icon and set text if we want to render any text. 
                      suffixProps will set the icon or text at the right side of the text field
                      Example: { icon: VEC_ICON_NAME.ICON_DROPDOWN_CARET } or { text: "+91" } 
 * 
 * @props prefixProps: Object containing icon or text. Set icon if we want to render the icon and set text if we want to render any text. 
                      prefixProps will set the icon or text at the left side of the text field
                      Example: { icon: VEC_ICON_NAME.ICON_DROPDOWN_CARET } or { text: "+91" } 
 */

import { React, useState } from "react";
import TextInput from "../textinput/TextInput";
import { VEC_ICON_NAME } from "../../icon/constants";

export default function PasswordInput({
    id = null,
    label = "",
    name,
    type = "password",
    placeHolder = "",
    value,
    prefixProps = { icon: VEC_ICON_NAME.PASSWORD_ICON },
    suffixProps = { icon: VEC_ICON_NAME.TOGGLE_PASSWORD_ICON, iconToolTipText: "Show password" },
    onChangeCb = () => { }
}) {

    const [inputType, setInputType] = useState(type);
    const [suffixIcon, setSuffixIcon] = useState(suffixProps)
    const onInputChangeHandler = () => {
        setSuffixIcon(inputType === 'password' ?
            { icon: VEC_ICON_NAME.TOGGLE_PASSWORD_ICON, iconToolTipText: "Show password" } :
            { icon: VEC_ICON_NAME.VIEW_ICON, iconToolTipText: "Hide password" }
        )
        setInputType(prev => prev === "password" ? "text" : "password")
    }

    return (
        <>
            <TextInput
                id={id}
                label={label}
                name={name}
                type={inputType}
                placeHolder={placeHolder}
                value={value}
                prefixProps={prefixProps}
                suffixProps={{ ...suffixIcon, suffixIconCb: onInputChangeHandler }}
                onChangeCb={onChangeCb}
            />
        </>
    );
}
