import React from 'react';
import Button from '../button/Button';
import { BUTTON_TYPE } from '../../libs/constant';

const Container = ({
    header = '',
    prefixProps = {},
    suffixProps = {},
    children,
    containerClassName = '',
    containerMainClassName = '',
    showContainerStyle=true
}) => {
    return (
        <div className={showContainerStyle ? 'card-container ' + containerMainClassName: null}>
            {header && <label className="card-header">{header}</label>}

            {children}

            <div className={'button-group ' + containerClassName}>
                {prefixProps.name?.length ? (
                    <Button className="button-width" variant={prefixProps.variant} onClickCb={prefixProps.onClickPreviousCb} >
                        {prefixProps.name}
                    </Button>
                ) : (
                    ''
                )}
                {suffixProps.name?.length ? (
                    <Button className="button-width" onClickCb={suffixProps.disabled ? suffixProps.submitButtonDisabledInfoCb : suffixProps.onClickNextCb}>
                        {suffixProps.name}
                    </Button>
                ) : (
                    ''
                )}
            </div>
        </div>
    );
};

export default Container;
