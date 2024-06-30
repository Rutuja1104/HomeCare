import React from 'react'
import styles from "./Label.styles"
import { LABEL_TYPE, LABEL_WEIGHT } from './constants';

export default function Label({ children, customStyles = {}, weight, type = "" }) {
    return (
        <>
            <label style={{ ...styles.label, ...getLabelStyles(type), ...getFontWeightStyles(weight), ...customStyles }}>
                {children}
            </label>
        </>
    )
}

const getLabelStyles = (type) => {
    switch (type) {
    case LABEL_TYPE.GENERAL: default: return styles.label;
    case LABEL_TYPE.FORM: return styles.formLabel;
    }
}

const getFontWeightStyles = (weight) => {
    switch (weight) {
    case LABEL_WEIGHT[700]: return styles.fontWeight700;
    case LABEL_WEIGHT[600]: return styles.fontWeight600;
    case LABEL_WEIGHT[500]: return styles.fontWeight500;
    default: return {};
    }
}