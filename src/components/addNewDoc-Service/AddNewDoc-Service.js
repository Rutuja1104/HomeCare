import React from 'react';
import { Children } from 'react';
import Icons from '../icon/Icon';
import { VEC_ICON_NAME } from '../icon/constants';
import Button from '../button/Button';
import { BUTTON_TYPE } from '../../libs/constant';

const AddNewDocService = ({ className, onClick = () => {}, name }) => {
    return (
        <Button className={className} onClick={onClick} type="text" variant={BUTTON_TYPE.PRIMARY_LIGHT_WITH_BORDER}>
            <span>{name}</span>
            <Icons iconName={VEC_ICON_NAME.PLUS_ICON} />
        </Button>
    );
};
export default AddNewDocService;
