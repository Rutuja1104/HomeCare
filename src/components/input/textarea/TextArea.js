import React from 'react';
import styles from './TextArea.styles';

export default function TextArea({ value, label, onChangeCb, onBlurCb, placeholder, rows = 4, cols, disabled, customStyles = {}, name = "", readOnly = false }) {
    return <>
        <div style={styles.container}>
            {label && <label style={styles.label}>{label}</label>}
            <textarea
                readOnly={readOnly}
                className='text-area'
                value={value}
                onChange={onChangeCb}
                placeholder={placeholder}
                rows={rows}
                cols={cols}
                disabled={disabled}
                style={{ ...styles.textAreaStyle, ...customStyles }}
                onBlur={onBlurCb}
                name={name}
            />
        </div>
    </>
}