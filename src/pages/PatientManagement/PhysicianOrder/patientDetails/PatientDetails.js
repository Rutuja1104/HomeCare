import React, { useEffect } from 'react';
import Heading from '../../../../components/heading/Heading';
import { HEADING } from '../../../../components/heading/constants/constants';
import { useDispatch, useSelector } from 'react-redux';
import { getPatientById } from '../../referral-intake/PatientManagementSaga';
import { useParams } from 'react-router-dom';
import {
    componentKey,
    setActiveRefferalPatientIntakeStep,
    setPatientReferralIntakeSign
} from '../../referral-intake/PatientManagementSlice';
import Button from '../../../../components/button/Button';
import { BUTTON_TYPE } from '../../../../libs/constant';
const PatientDetails = () => {
    const { patientId, agencyId } = useParams();

    const dispatch = useDispatch();
  

    const { patientById } = useSelector(
        (state) => state[componentKey]
    );


    useEffect(() => {
        dispatch(getPatientById({ patientId, agencyId }));
    }, []);
    return (
        <div className="">
            <div className="personalDetails">
                <Heading type={HEADING.h3}>Personal Details</Heading>

                <div className="mt-4">
                    <div className="block1">
                        <div className="block">
                            <Heading type={HEADING.H3}>Name</Heading>
                            <span>{patientById?.firstName + ' ' + patientById?.lastName}</span>
                        </div>
                        <div className="block">
                            {' '}
                            <Heading type={HEADING.H3}>Email</Heading>
                            <span>{patientById?.email || '-'}</span>
                        </div>
                        <div className="block">
                            {' '}
                            <Heading type={HEADING.H3}>contact Number</Heading>
                            <span>{patientById?.phoneNumber || '-'}</span>
                        </div>
                        <div className="block">
                            <Heading type={HEADING.H3}>HIC Number</Heading>
                            <span>{patientById?.HICNumber || '-'}</span>
                        </div>
                        <div className="block">
                            <Heading type={HEADING.H3}>SSN</Heading>
                            {/* <span>{patientById?.ssn}</span> */}
                            {/* input.length > 4 ? "****" + input.slice(-4) : "****"; */}
                            {patientById?.ssn?.length > 0 ? '*****' + patientById?.ssn?.slice(-4) : '-'}
                        </div>
                    </div>
                    <div className="mt-2">
                        <div className="">
                            <Heading type={HEADING.H3}>Address</Heading>
                            <span>
                                {patientById?.homeAddress?.addressLine1 +
                                    ',' +
                                    patientById?.homeAddress?.addressLine2 +
                                    ',' +
                                    patientById?.homeAddress?.city +
                                    ',' +
                                    patientById?.homeAddress?.state +
                                    ',' +
                                    patientById?.homeAddress?.pinCode}
                            </span>
                        </div>
                    </div>
                </div>
            </div>
            <div className="service">
                <Heading type={HEADING.h3}>Physician Details</Heading>
                <div className="block1">
                    <div className="block">
                        <Heading type={HEADING.h3}>Name</Heading>
                        <span> {`${patientById.physician?.firstName || '-'} ${patientById.physician?.lastName || ''}`.trim()}</span>
                    </div>
                    <div className="block">
                        <Heading type={HEADING.h3}>Primary Email</Heading>

                        <span>{patientById?.physician?.primaryEmail || '-'}</span>
                    </div>
                    <div className="block">
                        <Heading type={HEADING.h3}>Fax</Heading>

                        <span>{patientById?.physician?.fax || '-'}</span>
                    </div>
                    <div className="block">
                        <Heading type={HEADING.h3}>Contact Number</Heading>

                        <span>{patientById?.physician?.contactNumber || '-'}</span>
                    </div>
                    <div className="block">
                        <Heading type={HEADING.h3}>NPI</Heading>

                        <span>{patientById?.physician?.NPI || '-'}</span>
                    </div>
                </div>

                <div className="mt-2">
                    <div>
                        <Heading type={HEADING.H3}>Practice Address</Heading>
                        <span>
                            {patientById?.physician?.practiceAddress?.addressLine1 +
                                ',' +
                                patientById?.physician?.practiceAddress?.addressLine2 +
                                ',' +
                                patientById?.physician?.practiceAddress?.city +
                                ',' +
                                patientById?.physician?.practiceAddress?.pinCode}
                        </span>
                    </div>
                </div>
            </div>{' '}
            <div className="insurance mb-4">
                <Heading type={HEADING.h3}>Insurance Details</Heading>
                <div className="block1">
                    <div className="block">
                        <Heading type={HEADING.h3}>Payer Name</Heading>
                        <span>{patientById?.payer?.[0]?.payerName || '-'}</span>
                    </div>
                    <div className="block">
                        <Heading type={HEADING.h3}>Plan Name</Heading>
                        <span>{patientById?.payer?.[0]?.planName || '-'}</span>
                    </div>
                    <div className="block">
                        <Heading type={HEADING.h3}>Insurance Id</Heading>
                        <span>{patientById?.payer?.[0]?.insuranceId || '-'}</span>
                    </div>{' '}
                    <div className="block">
                        <Heading type={HEADING.h3}>Insurance Type</Heading>
                        <span>{patientById?.payer?.[0]?.insuranceType || '-'}</span>
                    </div>
                    <div className="block"></div>
                </div>
            </div>
            <div>
                <Button
                    type={BUTTON_TYPE.PRIMARY}
                    className="button-width primary-btn"
                    onClickCb={() => {
                        dispatch(setActiveRefferalPatientIntakeStep(1));
                    }}
                >
                    Next
                </Button>
            </div>
        </div>
    );
};
export default PatientDetails;
