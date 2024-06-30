import React from 'react';
import { responsiveLabelValueStyles } from './ResponsiveLabelValue.styles'
import General from '../../libs/utility/General';

const ResponsiveLabelValue = ({ data }) => {
    return (
        <div style={responsiveLabelValueStyles.labelValueContainer}>
            {data?.map((item, index) => {
                return (<div key={index} style={responsiveLabelValueStyles.labelValuePair}>
                    <p style={{ ...responsiveLabelValueStyles.label }}>{General.formatLabelAndValue(item.label, item.value).label}</p>
                    <span style={{ ...responsiveLabelValueStyles.value }}>{General.formatLabelAndValue(item.label, item.value).value || General.formatLabelAndValue(item.label, item.value)?.label?.length !== 0 && "-"}</span>
                </div>)
            })}
        </div>
    );
};

export default ResponsiveLabelValue;
