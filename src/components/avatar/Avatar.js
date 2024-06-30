import React from 'react';
import General from '../../libs/utility/General';

const Avatar = ({ src, alt, size = 'md', rounded = true,style={}}) => {
    const token = General.getLocalStorageData('token');

    const hasImage = src && src.length > 0;
    const classes = `avatar avatar-${size}  ${rounded ? 'rounded-circle' : ''}`;

    if (hasImage) {
        return <img src={src} alt={alt} className={classes} style={{...style}}/>;
    } else {
        return (
            <div className={'avatar-initials avatar-title rounded-circle'} style={{...style}}>
                {General.tokenDecode(token).firstName.charAt(0)}{General.tokenDecode(token).lastName.charAt(0)}
            </div>
        );
    }
};

export default Avatar;
