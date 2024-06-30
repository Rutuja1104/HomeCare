import React from 'react';
import LocalIcons from './LocalIcons';

export default function Icons({ familyName = 'vec', iconName, transformScale = 1, color, style = {}, rotateDeg = 0 }) {
    switch (familyName) {
    case 'vec':
        return (
            <LocalIcons
                iconName={iconName}
                color={color}
                style={style}
                transformScale={transformScale}
                rotateDeg={rotateDeg}
            />
        );
    default:
        return <i className={iconName}></i>;
    }
}
