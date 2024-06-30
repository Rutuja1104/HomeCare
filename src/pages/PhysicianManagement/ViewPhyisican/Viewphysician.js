import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { componentKey } from '../PhysicianManagementSlice';
import { getPhysicianById } from '../PhysicianManagementSaga';
import Heading from '../../../components/heading/Heading';
import { HEADING } from '../../../components/heading/constants/constants';
import Label from '../../../components/label/labelV2/Label';
import Icons from '../../../components/icon/Icon';
import { VEC_ICON_NAME } from '../../../components/icon/constants';
import moment from 'moment';
import TabbedNavigation from '../../../components/tabbedNavigation/TabbedNavigation';
import F2FOfPhysician from './tabs/f2fOfPhysician';
import PersonalDetailsOfPhysician from './tabs/personalDetailsOfPhysician';
import PhysicianOrderOfPhysician from './tabs/physicianOrderOfPhysician';
import ProfileImage from '../../../components/profileImg/ProfileImage';
import General from '../../../libs/utility/General';
const ViewPhysician = () => {
    const { physicianId } = useParams();
    const { physicianById } = useSelector((state) => state[componentKey]);
    const agencyId = General.getLocalStorageData('agencyId');
    const dispatch = useDispatch();

    const tabList = [
        // {
        //     title: 'Persnoal Details',
        //     linkTo: '/tab1',
        //     tabBodyComponent: <PatientsPersonalDetails data={patientData}/>
        // },
        {
            title: 'Personal Details',
            linkTo: '/tab2',
            tabBodyComponent: <PersonalDetailsOfPhysician data={physicianById} />
        },
        {
            title: 'Physician orders',
            linkTo: '/tab3',
            tabBodyComponent: <PhysicianOrderOfPhysician data={physicianById} />
        },
        {
            title: 'Face to Face Encounter',
            linkTo: '/tab3',
            tabBodyComponent: <F2FOfPhysician data={physicianById} />
        }
    ];
    useEffect(() => {
        dispatch(getPhysicianById({ physicianId, agencyId }));
    }, []);
    return (
        <div className="view-patient-container">
            {physicianById ? (
                <>
                    <div className="view-patient-details">
                        <div className="personal-info-1">
                            <div className="block1">
                                <ProfileImage />
                            </div>
                            <div className="block2">
                                <Heading type={HEADING.h6}>
                                    {physicianById?.firstName || ''} {physicianById?.lastName || ''}
                                </Heading>
                                <div className="">
                                    <span>
                                        <Icons iconName={VEC_ICON_NAME.CALL_ICON} />
                                    </span>
                                    <span className="text" style={{ marginLeft: 10 }}>
                                        {physicianById?.contactNumber || '-'}
                                    </span>
                                </div>
                                <div>
                                    <span style={{}}>
                                        <Icons iconName={VEC_ICON_NAME.MAIL_OUTLINE} />
                                    </span>
                                    <span className="text" style={{ marginLeft: 10 }}>
                                        {physicianById?.primaryEmail || '-'}
                                    </span>
                                </div>
                                
                            </div>
                        </div>
                        <div className="personal-info-2">
                            <div className="block1">
                                <div className="block">
                                    <Label>NPI</Label>
                                    <p>{physicianById?.NPI || '-'}</p>
                                </div>
                                <div className="block">
                                    <Label>Fax</Label>
                                    <p>{physicianById?.fax || '-'}</p>
                                </div>
                                <div className="block">
                                    <Label>Status</Label>
                                    <p>{physicianById?.status || '-'}</p>
                                </div>
                            </div>
                            <div className="block2">
                                <div className="block">
                                    <Label>Date of Birth</Label>
                                    <p>{physicianById?.dateOfBirth ? moment(physicianById?.dateOfBirth).format('MM-DD-YYYY') : '-'}</p>

                                </div>
                                <div className="block">
                                    <Label>Secondary Mail</Label>
                                    <p>{physicianById?.secondaryEmail || '-'}</p>
                                </div>{' '}
                                <div className="block">
                                    {/* <Label>Gender</Label> */}
                                    {/* <p>{physicianById?.gender || '-'}</p> */}
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
export default ViewPhysician;
