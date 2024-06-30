/**
 * @props text: Text of the label (string)
 * @props icon: Name of the icon to be displayed on the card. (string)
 * @props familyName: Family name of the icon (string). 'fa' | 'fas' | 'fab' | 'vec'
 * @props labelStyles: custom styles for label
 */

import React from 'react';
import styles from './IconLabel.styles'
import Icons from '../icon/Icon';

export default function IconLabel({ text, icon, familyName = "vec", labelStyles = {}, onClickCb = () => { }, containerStyles = {} }) {

    return (
        <div style={{ ...styles.iconContainer, ...containerStyles }} onClick={onClickCb}>
            {icon && <Icons familyName={familyName} iconName={icon} />}
            <label style={{ ...styles.label, ...labelStyles }}>{text}</label>
        </div>
    );
}