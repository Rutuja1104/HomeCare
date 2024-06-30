/**
 * Represents a heading
 * @props children - The heading text.
 * @props customStyle - cutomStyle of the heading can be passed.
 * @props type - Type of the heading eg. H1,H2,etc.
 */

import React from "react";
import styles from './Heading.styles'
import { HEADING } from "./constants/constants";

export default function Heading({ children, customStyle = {}, onClickCb = () => {}, type }) {
    switch (type) {
    case HEADING.H1:
        return (
            <h1 style={{ ...styles.h1Body, ...customStyle }} onClick={onClickCb}>{children}</h1>
        );
    case HEADING.H2:
        return (
            <h2 style={{ ...styles.h2Body, ...customStyle }} onClick={onClickCb}>{children}</h2>
        );
    case HEADING.H3:
        return (
            <h2 style={{ ...styles.h3Body, ...customStyle }} onClick={onClickCb}>{children}</h2>
        );
    case HEADING.H4:
        return (
            <h2 style={{ ...styles.h4Body, ...customStyle }} onClick={onClickCb}>{children}</h2>
        );
    default:
        return (
            <h2 style={{ ...styles.h3Body, ...customStyle }} onClick={onClickCb}>{children}</h2>
        );
    }
}