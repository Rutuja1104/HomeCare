import React from 'react';
import Icons from '../../../../../components/icon/Icon';
import Label from '../../../../../components/label/labelV2/Label';
import { VEC_ICON_NAME } from '../../../../../components/icon/constants';

const Episodebox = ({ name, SSN, Gender, ProgramType, dateOfBirth, phoneNumber, email }) => {
    return (
        <div className='episode-box'>
            <div>
                <Label>{name || '-'}</Label>
            </div>
            <div className="">
                <span>
                    <Icons iconName={VEC_ICON_NAME.CALL_ICON} />
                </span>
                <span className="text" style={{ marginLeft: 10 }}>
                    {phoneNumber || '-'}
                </span>
                {'  '}
                <span style={{ marginLeft: 10 }}>
                    <Icons iconName={VEC_ICON_NAME.MAIL_OUTLINE} />
                </span>
                <span className="text" style={{ marginLeft: 10 }}>
                    {email || '-'}
                </span>
            </div>
            <div className='additional-info'>
                <div className='block'>
                    <Label>SSN</Label>
                    <p>{SSN || '-'}</p>
                </div>
                <div className='block'>
                    <Label>Gender</Label>
                    <p>{Gender || '-'}</p>
                </div>
                <div className='block'>
                    <Label>Program Type</Label>
                    <p>{ProgramType || '-'}</p>
                </div>
                <div className='block'>
                    <Label>Date of Birth</Label>
                    <p>{dateOfBirth || '-'}</p>
                </div>
            </div>
        </div>
    );
};
export default Episodebox;
