import React, { useEffect } from 'react';

import moment from 'moment';
// import Heading from '../../../components/heading/Heading';
import Label from '../../../components/label/labelV2/Label';
import Icons from '../../../components/icon/Icon';
import { VEC_ICON_NAME } from '../../../components/icon/constants';
import PatientsPhysicialDetails from '../PatientsInformation/PatientsPhysicalDetails';
import PatientsMedicalDetails from '../PatientsInformation/PatientsMedicalDetails';
import Heading from '../../../components/heading/Heading';
import { HEADING } from '../../../components/heading/constants/constants';
import TabbedNavigation from '../../../components/tabbedNavigation/TabbedNavigation';
import { useNavigate, useParams } from 'react-router-dom';
import { BUTTON_TYPE } from '../../../libs/constant';
import { EPISODE_MANAGEMENT } from '../../../routes/constants';
import { useDispatch, useSelector } from 'react-redux';
import { getPatientById } from '../referral-intake/PatientManagementSaga';
import { componentKey } from '../referral-intake/PatientManagementSlice';
import PatientPayerDetails from '../PatientsInformation/PatientPayerDetails';
import ProfileImage from '../../../components/profileImg/ProfileImage';
import IconLabel from '../../../components/iconlabel/IconLabel';
import General from '../../../libs/utility/General';
import PatientEpisodeList from '../PatientsInformation/PatientEpisodeList';
import Button from '../../../components/button/Button';

const ViewPatient = ({ patientData, onClose }) => {
    const { patientId } = useParams();
    const { patientById } = useSelector((state) => state[componentKey]);
    const agencyId = General.getLocalStorageData('agencyId');

    const navigate = useNavigate()
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getPatientById({ patientId, agencyId }));
    }, []);
    const tabList = [
        {
            title: 'Episodes',
            linkTo: '/tab2',
            tabBodyComponent: <PatientEpisodeList />
        },
        {
            title: 'Physician Details',
            linkTo: '/tab2',
            tabBodyComponent: <PatientsPhysicialDetails data={patientById} />
        },
        {
            title: 'Payer details',
            linkTo: '/tab3',
            tabBodyComponent: <PatientPayerDetails data={patientById} />
        },
        {
            title: 'Physician order',
            linkTo: '/tab3',
            tabBodyComponent: <PatientsMedicalDetails data={patientById} />
        },
        {
            title: 'Eligibility History',
            linkTo: '/tab3'
            // tabBodyComponent: <PatientsMedicalDetails data={patientById} />
        }
    ];

    return (
        <div className="view-patient-container">
            {patientById ? (
                <>
                    <div className="view-patient-details">
                        <div className="personal-info-1">
                            <div className="block1">
                                <ProfileImage />
                            </div>

                            <div className="block2">
                                <Heading type={HEADING.h6}>
                                    {patientById?.firstName || ''} {patientById?.lastName || ''}
                                </Heading>
                                <div className="">
                                    <span>
                                        <Icons iconName={VEC_ICON_NAME.CALL_ICON} />
                                    </span>
                                    <span className="text" style={{ marginLeft: 10 }}>
                                        {patientById?.phoneNumber || '-'}
                                    </span>
                                    {'  '}
                                    <span style={{ marginLeft: 10 }}>
                                        <Icons iconName={VEC_ICON_NAME.MAIL_OUTLINE} />
                                    </span>
                                    <span className="text" style={{ marginLeft: 10 }}>
                                        {patientById?.email || '-'}
                                    </span>
                                </div>

                                <div className="d-flex mt-2">
                                    <Icons iconName={VEC_ICON_NAME.LOCATION_ICON} />
                                    <IconLabel
                                        text={`${patientById?.homeAddress?.addressLine1 || ''}, ${patientById?.homeAddress?.addressLine2 || ''} ${patientById?.homeAddress?.city || ''},  ${patientById?.homeAddress?.state || ''}, ${patientById?.homeAddress?.pinCode || '-'}, ${patientById?.homeAddress?.country || '-'}`}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="personal-info-2">
                            <div className='d-flex justify-content-between'>
                                <div className='flex-grow-1'>
                                    <div className="block1">
                                        <div className="block">
                                            <Label>MRN</Label>
                                            <p>{patientById?.mrn || '-'}</p>
                                        </div>
                                        <div className="block">
                                            <Label>HIC Number</Label>
                                            <p>{patientById?.HICNumber || '-'}</p>
                                        </div>
                                        <div className="block">
                                            <Label>SSN</Label>
                                            <p>{patientById?.ssn || '-'}</p>
                                        </div>
                                    </div>
                                    <div className="block2">
                                        <div className="block">
                                            <Label>Date of Birth</Label>
                                            <p>{moment(patientById?.dateOfBirth).format('MM-DD-YYYY') || '-'}</p>
                                        </div>
                                        <div className="block">
                                            <Label>Race</Label>
                                            <p>{patientById?.race || '-'}</p>
                                        </div>{' '}
                                        <div className="block">
                                            <Label>Gender</Label>
                                            <p>{patientById?.gender || '-'}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div>
                        <TabbedNavigation tabList={tabList} />
                    </div>
                </>
            ) : (
                <p>No patient data available.</p>
            )}
        </div>
    );
};

export default ViewPatient;
