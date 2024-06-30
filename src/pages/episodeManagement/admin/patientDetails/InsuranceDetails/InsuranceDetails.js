import React, { useState } from 'react';
import { componentKey } from '../PatientDetailsSlice';
import { useSelector } from 'react-redux';
import { Collapse } from 'reactstrap';
import Icons from '../../../../../components/icon/Icon';
import { VEC_ICON_NAME } from '../../../../../components/icon/constants';
import Label from '../../../../../components/label/labelV2/Label';
import moment from 'moment';
const InsuranceDetails = () => {
    const { patientEpisodeList, patientDetails } = useSelector((state) => state[componentKey]);
    const [openCollapse, setOpenCollapse] = useState(null);

    const toggleCollapse = (index) => {
        setOpenCollapse(openCollapse === index ? null : index);
    };
    return (
        <div>
            <>
                {patientDetails?.payer &&
                    patientDetails?.payer?.map((episode, index) => (
                        <div
                            className=""
                            style={{ border: '1px solid', padding: '20px', borderRadius: '10px', marginTop: '10px' }}
                            key={index}
                        >
                            <div
                                onClick={() => toggleCollapse(index)}
                                style={{ cursor: 'pointer', border: '1px' }}
                                className="d-flex justify-content-between"
                            >
                                <Label>Insurance Details: {index + 1}</Label>
                                <Icons iconName={VEC_ICON_NAME.PLUS_ICON} />
                            </div>
                            <Collapse isOpen={openCollapse === index}>
                                <div className="d-flex justify-content-between mt-4">
                                    <div style={{ width: '28%' }}>
                                        <Label> Payer Namer</Label>
                                        <p>{episode?.payerName || '-'}</p>
                                    </div>
                                    <div style={{ width: '28%' }}>
                                        <Label>Plan Name</Label>
                                        <p>{episode?.planName || '-'}</p>
                                    </div>
                                    <div style={{ width: '28%' }}>
                                        <Label>Insurance Type</Label>
                                        <p>{episode?.insuranceType || '-'}</p>
                                    </div>
                                    <div style={{ width: '28%' }}>
                                        <Label>Insurance Id</Label>
                                        <p>{episode?.insuranceId || '-'}</p>
                                    </div>
                                    <div style={{ width: '28%' }}></div>
                                </div>
                                <div className="d-flex justify-content-between mt-4">
                                    <div style={{ width: '28%' }}>
                                        <Label>Effective From</Label>
                                        <p>{moment(episode?.effectiveFrom || '-').format('MM-DD-YYYY')}</p>
                                    </div>
                                    <div style={{ width: '28%' }}>
                                        <Label>Effective Till</Label>
                                        <p>{moment(episode?.effectiveTill || '-').format('MM-DD-YYYY')}</p>
                                    </div>
                                    <div style={{ width: '28%' }}>
                                        {/* <Label>effectiveFrom</Label>
                                        <p>{episode?.effectiveFrom || '-'}</p> */}
                                    </div>
                                    <div style={{ width: '28%' }}>
                                      
                                    </div>
                                    <div style={{ width: '28%' }}></div>
                                </div>
                            </Collapse>
                        </div>
                    ))}
            </>
        </div>
    );
};
export default InsuranceDetails;
