import React from 'react';
import Heading from '../../../components/heading/Heading';
import { HEADING } from '../../../components/heading/constants/constants';
import Label from '../../../components/label/labelV2/Label';
import moment from 'moment';

const PatientPayerDetails = ({ data }) => {
    const insuranceData = data?.payer?.map((item) => item);

    return (
        <div className="patients-physician-container">
            {insuranceData?.map((item, index) => (
                <React.Fragment key={index}>
                    <h4>Insurance Information - {index + 1}</h4>
                    <div className="physcian-block-1">
                        <div className="block">
                            <Label>Payer Name</Label>
                            <p>{insuranceData?.[index].payerName || '-'}</p>
                        </div>
                        <div className="block">
                            <Label>Plan Name</Label>
                            <p>{insuranceData?.[index]?.planName || '-'}</p>
                        </div>
                        <div className="block">
                            <Label>Insurance ID</Label>
                            <p>{insuranceData?.[index]?.insuranceId || '-'}</p>
                        </div>
                        <div className="block">
                            <Label>Insurance Type</Label>
                            <p>{insuranceData?.[index]?.insuranceType || '-'}</p>
                        </div>
                        <div className="block"></div>
                    </div>
                    <div className="physcian-block-1">
                        <div className="block">
                            <Label>Effective From</Label>
                            <p>
                                {insuranceData?.[0]?.effectiveFrom
                                    ? moment(insuranceData[0].effectiveFrom).format('MM-DD-YYYY')
                                    : '-'}
                            </p>
                        </div>
                        <div className="block">
                            <Label>Effective Till</Label>
                            <p>
                                {insuranceData?.[0]?.effectiveTill
                                    ? moment(insuranceData[0].effectiveTill).format('MM-DD-YYYY')
                                    : '-'}
                            </p>
                        </div>
                        <div className="block"></div>
                        <div className="block"></div>
                        <div className="block"></div>
                    </div>
                </React.Fragment>
            ))}
        </div>
    );
};

export default PatientPayerDetails;
