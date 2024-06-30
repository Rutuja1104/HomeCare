import React from 'react'
import styles from "./Checkbox.styles"
import "../directcss/Checkbox.scss"
import Icons from '../../icon/Icon'
import { VEC_ICON_NAME } from '../../icon/constants'

const Checkbox = ({ checked = false, onChangeCb, name = "", iconName = VEC_ICON_NAME.CHECKBOX_ICON, containerStyles = {}, disabled = false }) => {

    return (
        <>
            <div className={`custom-checkbox ${checked ? '' : 'unchecked'}`} style={{ ...styles.checkboxContainer, ...containerStyles }}>

                <input name={name} type="checkbox" checked={checked} onChange={onChangeCb} style={styles.checkBoxInput} disabled={disabled} />

                <Icons iconName={iconName} familyName={"vec"} style={styles.checkmark} />

            </div>
        </>
    )
}

export default Checkbox