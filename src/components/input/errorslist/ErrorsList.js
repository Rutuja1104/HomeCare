import React from 'react'
import styles from "./ErrorsList.styles"

const ErrorsList = ({ errors = {} }) => {
    return (
        <>
            {Object.keys(errors).length > 0 && (
                <ul style={styles.errorsList}>
                    {Object.values(errors).map((error) => (
                        <li key={error}>{error}</li>
                    ))}
                </ul>
            )}
        </>
    )
}

export default ErrorsList