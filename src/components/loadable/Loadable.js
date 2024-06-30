import React from 'react'
import { PAGE_STATE } from '../../libs/constant'
import Heading from '../heading/Heading'
import { HEADING } from '../heading/constants/constants'
import styles from "./Loadable.styles"

const Loadable = ({ loadingStates = PAGE_STATE.PAGE_READY, children, loadingMessage = "Loading...", showMessage = true, }) => {
    return (
        <>
            {(loadingStates == PAGE_STATE.LOADING) &&
                <div style={styles.overlay}>
                    <div className='loader'></div>
                    <Heading type={HEADING.H2} customStyle={styles.loadingText}>{showMessage && loadingMessage}</Heading>
                </div>
            }
            {children}
        </>
    )
}

export default Loadable
