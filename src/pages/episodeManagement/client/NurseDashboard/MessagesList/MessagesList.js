import React from 'react';
import Label from '../../../../../components/label/labelV2/Label';
// import Label from '../../../components/label/labelV2/Label';
const MessagesList = ({ src, name, message, time }) => {
    return (
        <div className="message-box">
            <div className="">
                <figure className="profile-image">
                    <img src={src || '-'} />
                </figure>
            </div>
            <div className="">
                <Label>{name || '-'}</Label>
                <p>{message || '-'}</p>
            </div>
            <div className="">
                <p>{time || '-'}</p>
            </div>
        </div>
    );
};
export default MessagesList;
