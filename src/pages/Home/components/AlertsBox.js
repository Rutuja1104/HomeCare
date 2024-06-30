import React from 'react';
import ProfileImage from '../../../components/profileImg/ProfileImage';
import { VEC_ICON_NAME } from '../../../components/icon/constants';
import Icons from '../../../components/icon/Icon';
const AlertsBox = ({ img, name, title, dateOfOnBoard, hoursLeft }) => {
    return (
        <div className="alert-box">
            <div className="d-flex justify-content-between">
                <div className="d-flex title">
                    {img ? (
                        name.charAt(0)
                    ) : (
                        <figure className="profile-image">
                            <ProfileImage img={img} />
                        </figure>
                    )}
                    <span style={{ marginLeft: '10px', marginTop: '4px' }}>{name || '-'}</span>
                </div>
                <span style={{ marginTop: '4px' }}>{hoursLeft}</span>
            </div>
            <div>
                <p style={{ color: '#252C32' }}>{title || '-'}</p>
                <p style={{ color: '#8F8F8F' }}>{dateOfOnBoard || '-'}</p>
            </div>
            <div>
                <p className="" style={{ color: '#151518' }}>
                    Send Reminder{' '}
                    <span>
                        <Icons iconName={VEC_ICON_NAME.ARROW_RIGHT_ICON}></Icons>
                    </span>
                </p>
            </div>
        </div>
    );
};
export default AlertsBox;
