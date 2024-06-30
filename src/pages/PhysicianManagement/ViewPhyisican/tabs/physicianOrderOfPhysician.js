import React, { useEffect, useState } from 'react';
import Label from '../../../../components/label/labelV2/Label';

const PhysicianOrderOfPhysician = ({ data }) => {

    const nurseservices =
        data?.medicalOrder?.[0]?.nurse?.map((item) => item?.service + ' - ' + item?.caseSequence) || [];
    const therapistServices =
        data?.medicalOrder?.[0]?.therapist?.map((item) => item?.service + ' - ' + item?.caseSequence) || [];
    const mswServices = data?.medicalOrder?.[0]?.MSW?.map((item) => item?.service + ' - ' + item?.caseSequence) || [];
    const hhaServices = data?.medicalOrder?.[0]?.HHA?.map((item) => item?.service + ' - ' + item?.caseSequence) || [];
    let arr = [];

    data?.medicalOrder?.map((item) => {
        if (item?.nurse?.length || item?.therapist?.length || item?.MSW?.length || item?.HHA?.length) {
            arr.push(item);
        }
    });

    return (
        <div className="physician-order-container">
            {arr &&
                arr?.map((item, index) => (
                    
                    <div key={index} className="physician-order-for-one">
                        {item?.nurse?.length || item?.therapist?.length || item?.MSW?.length || item?.HHA?.length ? (
                            <h4>
                                Physician order : {item.patient.firstName} {item.patient.lastName}
                            </h4>
                        ) : (
                            ''
                        )}

                        <div className="physician-order">
                            {item?.nurse?.length > 0 && (
                                <div className="physcian-block-1">
                                    <Label>Nurse Services</Label>
                                    {item?.nurse?.map((i, index) => (
                                        <div className="nurse-services" key={index}>
                                            <li>{i?.service + ' - ' + i?.caseSequence || '-'}</li>
                                        </div>
                                    ))}
                                </div>
                            )}

                            {item?.therapist?.length > 0 && (
                                <div className="physcian-block-1 mt-4">
                                    <Label>Therapist Services</Label>
                                    {item?.therapist?.map((i, index) => (
                                        <div className="nurse-services" key={index}>
                                            <li>{i?.service + ' - ' + i?.caseSequence || '-'}</li>
                                        </div>
                                    ))}
                                </div>
                            )}

                            {item?.MSW?.length > 0 && (
                                <div className="physcian-block-1 mt-4">
                                    <Label>Medical Social Worker Services</Label>
                                    {item?.MSW?.map((i, index) => (
                                        <div className="nurse-services" key={index}>
                                            <li>{i?.service + ' - ' + i?.caseSequence || '-'}</li>
                                        </div>
                                    ))}
                                </div>
                            )}

                            {item?.HHA?.length > 0 && (
                                <div className="physcian-block-1 mt-4">
                                    <Label>Home Health Aide Services</Label>
                                    {item?.HHA?.map((i, index) => (
                                        <div className="nurse-services" key={index}>
                                            <li>{i?.service + ' - ' + i?.caseSequence || '-'}</li>
                                        </div>
                                    ))}
                                </div>
                            )}
                            <div className="physician-sign">
                                {/* {item?.physiciansDigitalSignature ? ( */}
                                <div className="block">
                                    <Label>Physician Sign</Label>
                                    <img
                                        src={item?.physiciansDigitalSignature}
                                        alt="Physician Signature"
                                    />
                                </div>
                                {/* ) : (
                                    ''
                                )} */}
                            </div>
                        </div>
                    </div>
                ))}
        </div>
    );
};

export default PhysicianOrderOfPhysician;
