/**
 * @props id - Unique id for the tooltip. ID is important for tooltip to work.  (string)
 * @props text: Text that we want to show inside tooltip (string)
 * @props iconName: Name of the icon that we want to render (string)
 * @props iconStyles: custom styles for the tooltip icon.
**/

import React from 'react';
import TxTooltip from '../TxTooltip';
import styles from "./TxTooltipWIcon.styles"
import { VEC_ICON_NAME } from '../../icon/constants';
import Icons from '../../icon/Icon';

const TxTooltipWIcon = ({ id, text = "", iconName = VEC_ICON_NAME.INFO_ICON, iconStyles = { width: "20px", height: "20px" } }) => {

    return (
        <div style={styles.container}>
            <div id={id}>
                <Icons iconName={iconName} familyName="vec" style={iconStyles} />
            </div>

            <TxTooltip id={id} text={text} />
        </div>
    );
}

export default TxTooltipWIcon;
