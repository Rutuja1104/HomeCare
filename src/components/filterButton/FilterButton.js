import React from 'react';
import { BUTTON_TYPE } from '../../libs/constant';
import Icons from '../icon/Icon';
import { VEC_ICON_NAME } from '../icon/constants';

const FilterButton = ({ type = 'text', variant = BUTTON_TYPE.PRIMARY, className = '', onClickCb = () => {} }) => {
    return (
        <button onClick={onClickCb} type={type} className={`${className} ${getButtonStyles(variant)}`}>
            <Icons iconName={VEC_ICON_NAME.FILTER_LINES_ICON} />
            <span style={{ marginLeft: '10px' }}>Filters</span>
        </button>
    );
};

export default FilterButton;

const getButtonStyles = (type) => {
    switch (type) {
    case BUTTON_TYPE.PRIMARY:
    default:
        return 'primary-btn';
    case BUTTON_TYPE.PRIMARY_LIGHT_WITH_BORDER:
        return 'primary-light-with-border-btn';
    }
};
