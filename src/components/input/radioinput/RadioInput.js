/**
 * @props label: label for the radio button
 * @props value: value of the radio button
 * @props name: Name for the element. Name will be same as the property that we want to change (string)
 * @props onChangeCb: Callback Function which recieves event object whenever radio button changes
 * @props color: color of the radio button after getting selected
 * @props customStyle: apply custom style to radio-lable
 */

import React from "react";
import "./directcss/RadioInput.scss"
import styles from './RadioInput.styles';
import Icons from "../../icon/Icon";
import { VEC_ICON_NAME } from "../../icon/constants";

const RadioInput = ({
    label = {
        suffixLabel: "",
        prefixLabel: ""
    },
    value = "",
    name = "",
    checked = false,
    onChangeCb = () => { },
    color = "#215DAA",
    customStyle = {},
    iconName = "",
    disabled
}) => {
    return (
        <label className="radio-label" style={{ ...customStyle, ...(disabled) ? styles.disabledStyle : {} }}>
            <input
                type="radio"
                className="radio-input"
                name={name}
                value={value}
                checked={checked}
                onChange={onChangeCb}
                disabled={disabled}
            />

            <div className="prefix-text">
                {iconName && <Icons iconName={iconName} familyName={"vec"} />}

                {label.prefixLabel && <span style={styles.radioLabel}>{label.prefixLabel}</span>}
            </div>


            <span className="radio-icon" style={{ borderColor: checked ? color : "" }}>
                <Icons iconName={VEC_ICON_NAME.RADIO_BUTTON_ICON} familyName={"vec"} color={checked ? color : "#fff"} />
            </span>

            {label.suffixLabel && <span style={styles.radioLabel}>{label.suffixLabel}</span>}

        </label>
    );
};

export default RadioInput;
