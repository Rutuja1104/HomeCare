/**
 * @props id - Unique id for the tooltip. ID is important for tooltip to work.  (string)
 * @props text: Text that we want to show inside tooltip (string)
**/

import React, { useState } from 'react';
import { Tooltip } from 'reactstrap';
import styles from "./JobAppicationListTooltip.styles"
import "./directcss/TxTooltip.scss"

const JobAppicationListTooltip = ({ id = "", text = "" }) => {
    const [tooltipOpen, setTooltipOpen] = useState(false);

    const toggle = () => setTooltipOpen(!tooltipOpen);
    
    return (
        <>
            <Tooltip
                placement="bottom"
                isOpen={tooltipOpen}
                target={id}
                toggle={toggle}
                className="custom-tooltip"
                style={styles.tooltipBackground}
            >
                {text}
            </Tooltip>
        </>
    );
}

export default JobAppicationListTooltip;
