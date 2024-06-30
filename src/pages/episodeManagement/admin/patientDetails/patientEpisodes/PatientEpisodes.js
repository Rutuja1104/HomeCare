import React, { useState } from 'react';
import moment from 'moment';

import { useSelector } from 'react-redux';
import { componentKey } from '../PatientDetailsSlice';
import { useNavigate } from 'react-router-dom';
import { EPISODE_MANAGEMENT } from '../../../../../routes/constants';
import { Collapse } from 'reactstrap';
import { VEC_ICON_NAME } from '../../../../../components/icon/constants';
import { BUTTON_TYPE } from '../../../../../libs/constant';

import Label from '../../../../../components/label/labelV2/Label';
import Icons from '../../../../../components/icon/Icon';
import ImageWithDescription from '../../../../../components/ImageWithDescription/ImageWithDescription';
import Button from '../../../../../components/button/Button';

const PatientEpisodes = ({ uuid }) => {
    const navigate = useNavigate();
    const { patientEpisodeList, patientDetails } = useSelector((state) => state[componentKey]);

    const [openCollapse, setOpenCollapse] = useState(null);

    const toggleCollapse = (index) => {
        setOpenCollapse(openCollapse === index ? null : index);
    };

    return (
        <React.Fragment>

            {patientEpisodeList.length !== 0 ? (
                <>
                    <div className='mb-3 d-flex justify-content-start'>
                        <Button onClickCb={() => navigate(`/${EPISODE_MANAGEMENT.EPISODE_MANAGEMENT}/${EPISODE_MANAGEMENT.CHILD_ROUTS.CREATE_EPISODE}/${uuid}`)} type={BUTTON_TYPE.PRIMARY_LIGHT_WITH_BORDER}>Add New Episode</Button>
                    </div>
                    {patientEpisodeList.map((episode, index) => (
                        <div className="" style={{ border: '1px solid', padding: '20px', borderRadius: "10px", marginBottom: "20px" }} key={index}>
                            <div
                                onClick={() => toggleCollapse(index)}
                                style={{ cursor: 'pointer' }}
                                className="d-flex justify-content-between"
                            >
                                <Label>Episode: {index + 1}</Label>
                                <Icons iconName={VEC_ICON_NAME.PLUS_ICON} />
                            </div>
                            <Collapse isOpen={openCollapse === index}>
                                <div className="d-flex justify-content-between mt-4 ">
                                    <div style={{ width: '20%' }}>
                                        <Label> Conference Preparer</Label>
                                        <p>{episode?.caseConferencePreparer}</p>
                                    </div>
                                    <div style={{ width: '20%' }}>
                                        <Label> Conference Review 1</Label>
                                        <p>{episode?.caseConferenceReview1}</p>
                                    </div>
                                    <div style={{ width: '20%' }}>
                                        <Label> Conference Review 2</Label>
                                        <p>{episode?.caseConferenceReview2}</p>
                                    </div>
                                    <div style={{ width: '20%' }}>
                                        <Label>Emergency Level</Label>
                                        <p>{episode?.emergencyLevel}</p>
                                    </div>
                                    <div style={{ width: '20%' }}>
                                        <Label>Episode Duration</Label>
                                        <p>{episode?.episodeDuration}</p>
                                    </div>
                                </div>
                                <div className="d-flex justify-content-between mt-4">
                                    <div style={{ width: '20%' }}>
                                        <Label>Agency Location</Label>
                                        <p>{episode?.agencyLocation}</p>
                                    </div>
                                    <div style={{ width: '20%' }}>
                                        <Label>HIC Number</Label>
                                        <p>{episode?.HICNumber}</p>
                                    </div>
                                    <div style={{ width: '20%' }}>
                                        <Label>Cert From</Label>
                                        <p>{moment(episode?.certFrom).format('MM-DD-YYYY')}</p>
                                    </div>
                                    <div style={{ width: '20%' }}>
                                        <Label>Cert To</Label>
                                        <p>{moment(episode?.certTo).format('MM-DD-YYYY')}</p>
                                    </div>
                                    <div style={{ width: '20%' }}>
                                        <Label>Status</Label>
                                        <p>{episode?.status}</p>
                                    </div>
                                </div>
                                <div className="d-flex justify-content-between mt-4">
                                    <div style={{ width: '20%' }}>
                                        <Label>Control Number</Label>
                                        <p>{episode?.controlNumber}</p>
                                    </div>
                                    <div style={{ width: '20%' }}>
                                        <Label>Comments</Label>
                                        <p>{episode?.comments}</p>
                                    </div>
                                    <div style={{ width: '20%' }}>
                                        <Label>FaceToFace Date</Label>
                                        <p>{moment(episode?.faceToFaceDate).format('MM-DD-YYYY')}</p>
                                    </div>
                                    <div style={{ width: '20%' }}>
                                        <Label>SOC Date</Label>
                                        <p>{moment(episode?.SOCDate).format('MM-DD-YYYY')}</p>
                                    </div>
                                    <div style={{ width: '20%' }}></div>
                                    {/* <div></div> */}
                                </div>
                            </Collapse>
                        </div>
                    ))}
                </>
            ) : (
                <ImageWithDescription
                    className="assign-episode-img"
                    content="No episode has been assigned yet"
                    buttonTitle="Assign Episode"
                    onClickCb={() => navigate(`/${EPISODE_MANAGEMENT.EPISODE_MANAGEMENT}/${EPISODE_MANAGEMENT.CHILD_ROUTS.CREATE_EPISODE}/${uuid}`)}
                />
            )}
        </React.Fragment>
    );
};

export default PatientEpisodes;
