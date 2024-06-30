import React from 'react';
import ProfileImage from '../../../components/profileImg/ProfileImage';
const SceduledTasksBox = ({ scheduledStatus, img, discription, dateOfScheduled, name }) => {
    return (
        <div className="sceduled-task-container">
            <div className="title">
                <div className="d-flex">
                    {img ? (
                        name.charAt(0)
                    ) : (
                        <figure className="profile-image">
                            <ProfileImage img={img} />
                        </figure>
                    )}
                    <span style={{ marginLeft: '10px', marginTop: '4px' }}>{name || '-'}</span>
                </div>
                <span>{scheduledStatus}</span>
            </div>
            <div className="">
                <span>{discription}</span>
            </div>
            <div className="sceduled-date">
                <span>{dateOfScheduled}</span>
            </div>
        </div>
    );
};
export default SceduledTasksBox;
