import React from 'react'
import RadioInput from '../RadioInput'
import styles from './RadioInputWCard.styles'

const RadioInputWCard = ({
    label = {
        suffixLabel: "",
        prefixLabel: ""
    },
    value = "",
    name = "",
    checked = false,
    onChangeCb = () => { },
    iconName = ""
}) => {
    return (
        <div style={styles.card}>
            <RadioInput
                name={name}
                label={label}
                value={value}
                checked={checked}
                onChangeCb={onChangeCb}
                iconName={iconName}
                customStyle={styles.radioInput}
            />
        </div>
    )
}

export default RadioInputWCard
