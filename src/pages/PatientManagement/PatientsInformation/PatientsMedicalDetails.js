import React from 'react';
import Heading from '../../../components/heading/Heading';
import { HEADING } from '../../../components/heading/constants/constants';
import Label from '../../../components/label/labelV2/Label';

const PatientsMedicalDetails = ({ data }) => {
    const nurseservices = data?.medicalOrder?.[0]?.nurse?.map((item) => item?.service + ' - ' + item?.caseSequence);
    const therapistServices = data?.medicalOrder?.[0]?.therapist?.map(
        (item) => item?.service + ' - ' + item?.caseSequence
    );
    const mswServices = data?.medicalOrder?.[0]?.MSW?.map((item) => item?.service + ' - ' + item?.caseSequence);
    const hhaServices = data?.medicalOrder?.[0]?.HHA?.map((item) => item?.service + ' - ' + item?.caseSequence);
    return (
        <div className="physician-order">
            
            {data?.medicalOrder?.[0]?.nurse.length > 0 && (
                <div className="physcian-block-1">
                    <Label>Nurse Services</Label>
                    {nurseservices?.map((i) => (
                        <div className="nurse-services" key={i}>
                            <>
                                <li key={i}>{i || '-'}</li>
                            </>
                        </div>
                    ))}
                </div>
            )}

            {data?.medicalOrder?.[0]?.therapist.length > 0 && (
                <div className="physcian-block-1 mt-4">
                    <Label>Therapist Services</Label>
                    {therapistServices?.map((i) => (
                        <div className="nurse-services" key={i}>
                            <>
                                <li key={i}>{i || '-'}</li>
                            </>
                        </div>
                    ))}
                </div>
            )}
            {data?.medicalOrder?.[0]?.MSW.length > 0 && (
                <div className="physcian-block-1 mt-4">
                    <Label>Medical Social Worker Services</Label>
                    {mswServices?.map((i) => (
                        <div className="nurse-services" key={i}>
                            <>
                                <li key={i}>{i || '-'}</li>
                            </>
                        </div>
                    ))}
                </div>
            )}
            {data?.medicalOrder?.[0]?.HHA.length > 0 && (
                <div className="physcian-block-1 mt-4">
                    <Label>Medical Social Worker Services</Label>
                    {hhaServices?.map((i) => (
                        <div className="nurse-services" key={i}>
                            <>
                                <li key={i}>{i || '-'}</li>
                            </>
                        </div>
                    ))}
                </div>
            )}
            <div className="physician-sign">
                {data?.medicalOrder?.[0]?.physiciansDigitalSignature ? (
                    <div className="block">
                        <Label>Physician Sign</Label>
                        <img src={data?.medicalOrder?.[0]?.physiciansDigitalSignature} />
                    </div>
                ) : (
                    ''
                )}
            </div>
        </div>
    );
};

export default PatientsMedicalDetails;
