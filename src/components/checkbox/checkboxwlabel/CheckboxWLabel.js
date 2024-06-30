import React from 'react'
import Checkbox from '../basecheckbox/Checkbox';
import styles from "./CheckboxWLabel.styles"
import Label from '../../label/labelV2/Label';

const CheckboxWLabel = ({ checked = false, label = "", onChangeCb = () => { }, weight, name = "", iconName, labelCustomStyles = {}, disabled, containerStyles = {} }) => {

    return (
        <div style={{ ...styles.checkboxWLabelContainer, ...containerStyles }}>
            <Checkbox name={name} checked={checked} onChangeCb={onChangeCb} iconName={iconName} disabled={disabled} />
            <Label
                customStyles={{ ...styles.checkboxLabel, ...labelCustomStyles }}
                weight={weight}
            >
                {label}
            </Label>
        </div>
    );
}

export default CheckboxWLabel