import React from 'react'
import styles from './DirectStyles/HorizontalSeparator.styles'

const HorizontalSeparator = ({ style }) => {
    return <div style={{ ...styles.borderContainer, ...style }}></div>
}

export default HorizontalSeparator
