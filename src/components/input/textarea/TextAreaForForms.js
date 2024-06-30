import React, { useState } from 'react';
import TextArea from './TextArea';
import styles from './TextArea.styles';

export default function TextAreaForForms({ value, onChangeCb, onBlurCb, placeholder, rows=4, cols, disabled, customStyles={}, maxCharacterCount = 40 }) {
    
    const [characterCount, setCharacterCount] = useState(maxCharacterCount);

    const handleChange = (event) => {
        const inputText = event.target.value;
        const remainingCount = maxCharacterCount - inputText.length;
        setCharacterCount(remainingCount);
        if (remainingCount < 0) {
            event.target.value = inputText.slice(0, maxCharacterCount);
            setCharacterCount(0);
        }
        onChangeCb(event);
    };
    
    return <>
        <TextArea
            value={value} 
            onChangeCb={handleChange} 
            onBlurCb={onBlurCb}
            rows={rows}
            cols={cols}
            customStyles={customStyles}
            disabled={disabled}
            placeholder={placeholder}
        />
        <p style={styles.noMarginBottom}>Character remaining: {characterCount}</p>
    </>
}