import React from 'react';
import { BUTTON_TYPE } from '../../libs/constant';
import Icons from '../icon/Icon';

const Button = ({
    id = "",
    children,
    type = 'text',
    variant = BUTTON_TYPE.PRIMARY,
    className = '',
    onClickCb = () => { },
    disabled = false,
    prefixProps = {},
    suffixProps = {},
    styles = {}
}) => {
    return (
        <button
            id={id}
            onClick={onClickCb}
            disabled={disabled}
            type={type}
            style={styles}
            className={`${className} ${getButtonStyles(variant)} ${(prefixProps?.icon || suffixProps?.icon) && ' button-with-icon'}`}
        >
            {prefixProps?.icon && <Icons familyName="vec" iconName={prefixProps?.icon} />} {children} {suffixProps?.icon && <Icons familyName="vec" iconName={suffixProps?.icon} rotateDeg={suffixProps?.rotateDeg} />}
        </button>
    );
};

export default Button;

const getButtonStyles = (type) => {
    switch (type) {
    case BUTTON_TYPE.PRIMARY:
    default:
        return 'primary-btn';
    case BUTTON_TYPE.PRIMARY_LIGHT_WITH_BORDER:
        return 'primary-light-with-border-btn';
    case BUTTON_TYPE.LIGHT_WITH_NO_BORDER:
        return 'light-with-no-border';
    case BUTTON_TYPE.DANGER:
        return 'primary';
    }
};
