import React from 'react';
import Icons from '../../../components/icon/Icon';
import { VEC_ICON_NAME } from '../../../components/icon/constants';
const CountBox = ({ iconName, title, children }) => {
    return (
        <div className='count-box'>
            <div>
                <Icons iconName={iconName} />
                <span>{title}</span>
            </div>

            {children}
           
        </div>
    );
};
export default CountBox;
