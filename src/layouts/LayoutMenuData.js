import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';

import { ROLES } from '../libs/constant';
import Icons from '../components/icon/Icon';
import { VEC_ICON_NAME } from '../components/icon/constants';
import { BILLERS_ROUTES, CLIENT_EPISODE_MANAGEMENT, CLIENT_SCHEDULE, EPISODE_MANAGEMENT, JOB_POSTING, STAFF_MANAGEMENT_ROUTES } from '../routes/constants';
import { componentKey, setIsLogout } from '../pages/Authentication/AuthenticationSlice';
import { useDispatch, useSelector } from 'react-redux';
import { setHeaderLabel } from './LayoutSlice';
import { useLocation } from 'react-router-dom';

const NavData = () => {
    const [isHome, setIsHome] = useState(true);
    const [isNewPatient, setIsNewPatient] = useState(false);
    const [isTodaysTasks, setIsTodaysTasks] = useState(false);
    const [isMonthlySchedule, setIsMonthlySchedule] = useState(false);
    const [isMyAccount, setIsMyAccount] = useState(false);
    const [isMessages, setIsMessages] = useState(false);
    const [isFAQs, setIsFAQs] = useState(false);
    const [isContactUs, setIsContactUs] = useState(false);
    const [isNurseManagement, setIsNurseManagement] = useState(false)
    const [isJobPosting, setIsJobPosting] = useState(false)
    const [isEpisodeManagement, setIsEpisodeManagement] = useState(false)
    const [isSubJobApplication, setIsSubJobApplication] = useState(false)
    const [isSubJobPosting, setIsSubJobPosting] = useState(false)
    const [isSubNurseManagement, setIsSubNurseManagement] = useState(false)
    const [isSubTherapistManagement, setIsSubTherapistManagement] = useState(false)
    const [isSubIsInHouseStaff, setIsSubIsInHouseStaff] = useState(false)
    const [isSubIsHHAAndMSW, setIsSubIsHHAAndMSW] = useState(false)
    const [isCurrentState, setIsCurrentState] = useState('Home');
    const [isCurrentSubState, setIsCurrentSubState] = useState('');
    const [isPhysicianManagement, setIsPhysicianManagement] = useState(false);
    const [isNurseDashboard, setIsNurseDashboard] = useState(false);
    const [isFormsState, setIsFormsState] = useState(false);
    const [isBiller, setIsBiller] = useState(false);
    const [isClaims, setIsClaims] = useState(false);
    const [isPaychecks, setIsPaychecks] = useState(false);
    const [isPayerContracts, setIsPayerContracts] = useState(false);
    const [isSubMessages, setIsSubMessages] = useState(false);
    const [isClientEpisode, setIsClientEpisode] = useState(false)
    const [isClientMonthlySchedule, setIsClientMonthlySchedule] = useState(false)

    const { isLogout } = useSelector((state) => state[componentKey]);
    const location = useLocation()
    const dispatch = useDispatch();

    useEffect(() => {

        if (isCurrentState !== 'Home') {
            setIsHome(false);
        }
        if (isCurrentState !== 'PatientManagement') {
            setIsNewPatient(false);
        }
        if (isCurrentState !== 'TodaysTasks') {
            setIsTodaysTasks(false);
        }
        if (isCurrentState !== 'MonthlySchedule') {
            setIsMonthlySchedule(false);
        }
        if (isCurrentState !== 'MyAccount') {
            setIsMyAccount(false);
        }
        if (isCurrentState !== 'FAQs') {
            setIsFAQs(false);
        }
        if (isCurrentState !== 'ContactUs') {
            setIsContactUs(false);
        }
        if (isCurrentState !== 'StaffManagement') {
            setIsNurseManagement(false);
        }
        if (isCurrentState !== 'JobPosting') {
            setIsJobPosting(false);
            setIsSubJobApplication(false);
            setIsSubJobPosting(false)
        }
        if (isCurrentState !== 'nursedashboard') {
            setIsNurseDashboard(false);
        }
        if (isCurrentState !== 'EpisodeManagement') {
            setIsEpisodeManagement(false);
        }
        if (isCurrentState !== 'Messages') {
            setIsMessages(false);
        }
        if (isCurrentSubState !== 'JobApplications') {
            setIsSubJobApplication(false);
        }
        if (isCurrentSubState !== 'JobPostings') {
            setIsSubJobPosting(false);
        }
        if (isCurrentSubState !== 'NurseManagement') {
            setIsSubNurseManagement(false);
        }
        if (isCurrentSubState !== 'TherapistManagement') {
            setIsSubTherapistManagement(false);
        }
        if (isCurrentSubState !== 'InHouseStaff') {
            setIsSubIsInHouseStaff(false);
        }
        if (isCurrentState !== 'PhysicianManagement') {
            setIsPhysicianManagement(false);
        }
        if (isCurrentSubState !== 'HHA&MSW') {
            setIsSubIsHHAAndMSW(false);
        }
        if (isCurrentSubState !== 'Forms') {
            setIsFormsState(false);
        }
        if (isCurrentState !== 'Biller') {
            setIsBiller(false);
            setIsClaims(false);
            setIsPaychecks(false);
            setIsPayerContracts(false);
            setIsSubMessages(false);
        }
        if (isCurrentSubState !== 'isClaims') {
            setIsClaims(false);
        }
        if (isCurrentSubState !== 'isPaychecks') {
            setIsPaychecks(false);
        }
        if (isCurrentSubState !== 'isPayerContracts') {
            setIsPayerContracts(false);
        }
        if (isCurrentSubState !== 'isSubMessages') {
            setIsSubMessages(false);
        }
        if (isCurrentState !== 'ClientEpisodes') {
            setIsClientEpisode(false);
        }
        if (isCurrentState !== 'ClientMonthlySchedule') {
            setIsClientMonthlySchedule(false);
        }
    }, [isHome, isClientMonthlySchedule, isClientEpisode, isNewPatient, isTodaysTasks, isCurrentState, isMonthlySchedule, isMyAccount, isFAQs, isContactUs, isNurseManagement, isJobPosting, isEpisodeManagement, isSubJobApplication, isSubJobPosting, isSubNurseManagement, isSubTherapistManagement, isSubIsInHouseStaff, isSubIsHHAAndMSW, isNurseDashboard, isMessages, isFormsState, isBiller, isClaims, isPaychecks, isPayerContracts, isSubMessages]);

    useEffect(() => {
        var currentPath = window.location.pathname;
        /* eslint-disable */
        switch (currentPath) {
            case "/patientmanagement":
                setIsNewPatient(true);
                setIsCurrentState('PatientManagement');
                break;
            case "/physicianmanagement":
                setIsCurrentState('PhysicianManagement');
                setIsPhysicianManagement(true)
                break;
            case `/${STAFF_MANAGEMENT_ROUTES.STAFF_MANAGEMENT}/${STAFF_MANAGEMENT_ROUTES.CHILD_ROUTS.NURSE_LIST}`:
                setIsNurseManagement(true);
                setIsCurrentState('StaffManagement');
                setIsSubNurseManagement(true);
                setIsCurrentSubState('NurseManagement');
                break;
            case `/${STAFF_MANAGEMENT_ROUTES.STAFF_MANAGEMENT}/${STAFF_MANAGEMENT_ROUTES.CHILD_ROUTS.THERAPIST_LIST}`:
                setIsNurseManagement(true);
                setIsCurrentState('StaffManagement');
                setIsSubTherapistManagement(true);
                setIsCurrentSubState('TherapistManagement');
                break;
            case "/episode-management/episode-list":
                setIsEpisodeManagement(true);
                setIsCurrentState('EpisodeManagement');
                break;
            case `/${JOB_POSTING.JOBS}/${JOB_POSTING.CHILD_ROUTS.JOB_APPLICATIONS}`:
                setIsJobPosting(true);
                setIsCurrentState('JobPosting');
                setIsSubJobApplication(true);
                setIsCurrentSubState('JobApplications');
                break;
            case `/${JOB_POSTING.JOBS}/${JOB_POSTING.CHILD_ROUTS.JOB_POSTING_LIST}`:
                setIsJobPosting(true);
                setIsCurrentState('JobPosting');
                setIsSubJobPosting(true);
                setIsCurrentSubState('JobPostings');
                break;
            case `/${JOB_POSTING.JOBS}/${JOB_POSTING.CHILD_ROUTS.JOB_APPLICATION_DETAILS}/:nurseId`:
                setIsJobPosting(true);
                setIsCurrentState('JobPosting');
                setIsSubJobApplication(true);
                setIsCurrentSubState('JobApplications');
                break;
            case `/${STAFF_MANAGEMENT_ROUTES.STAFF_MANAGEMENT}/${STAFF_MANAGEMENT_ROUTES.CHILD_ROUTS.NURSE_DETAILS}`:
                setIsNurseManagement(true);
                setIsCurrentState('StaffManagement');
                setIsSubNurseManagement(true);
                setIsCurrentSubState('NurseManagement');
                break;
            case `/${STAFF_MANAGEMENT_ROUTES.STAFF_MANAGEMENT}/${STAFF_MANAGEMENT_ROUTES.CHILD_ROUTS.OTHER_LIST}`:
                setIsNurseManagement(true);
                setIsCurrentState('StaffManagement');
                setIsSubIsHHAAndMSW(true);
                setIsCurrentSubState('HHA&MSW');
                break;
            case `/${STAFF_MANAGEMENT_ROUTES.STAFF_MANAGEMENT}/${STAFF_MANAGEMENT_ROUTES.CHILD_ROUTS.IN_HOUSE_STAFF}`:
                setIsNurseManagement(true);
                setIsCurrentState('StaffManagement');
                setIsSubIsInHouseStaff(true);
                setIsCurrentSubState('InHouseStaff');
                break;
            case `/${EPISODE_MANAGEMENT.EPISODE_MANAGEMENT}/${EPISODE_MANAGEMENT.CHILD_ROUTS.CREATE_EPISODE}/:patientId`:
                setIsEpisodeManagement(true);
                setIsCurrentState('EpisodeManagement');
                break;
            case `/nursedashboard`:
                setIsNurseDashboard(true)
                setIsCurrentState('nursedashboard')
                break
            case "/messages":
                setIsMessages(true);
                setIsCurrentState('Messages');
                break;
            case "/biller":
                setIsBiller(true);
                setIsCurrentState('Biller');
                break;
            case `/${BILLERS_ROUTES.BILLERS}/${BILLERS_ROUTES.CHILD_ROUTS.CLAIMS}`:
                setIsCurrentState('billers');
                setIsBiller(true);
                setIsClaims(true);
                setIsCurrentSubState('claims');
                break;
            case `/${BILLERS_ROUTES.BILLERS}/${BILLERS_ROUTES.CHILD_ROUTS.PAYCHECKS}`:
                setIsCurrentState('billers');
                setIsBiller(true);
                setIsPaychecks(true);
                setIsCurrentSubState('paychecks');
                break;
            case `/${BILLERS_ROUTES.BILLERS}/${BILLERS_ROUTES.CHILD_ROUTS.PAYERCONTRACTS}`:
                setIsCurrentState('billers');
                setIsBiller(true);
                setIsPayerContracts(true);
                setIsCurrentSubState('payerContracts');
                break;
            case `/${BILLERS_ROUTES.BILLERS}/${BILLERS_ROUTES.CHILD_ROUTS.MESSAGES}`:
                setIsCurrentState('billers');
                setIsBiller(true);
                setIsSubMessages(true);
                setIsCurrentSubState('messages');
                break;
            case `/${CLIENT_EPISODE_MANAGEMENT.EPISODE_MANAGEMENT}/${CLIENT_EPISODE_MANAGEMENT.CHILD_ROUTS.EPISODE_LISTING}`:
                setIsClientEpisode(true);
                setIsCurrentState('ClientEpisodes');
                break;
            case `/${CLIENT_SCHEDULE.SCHEDULE}`:
                setIsClientMonthlySchedule(true);
                setIsCurrentState('ClientMonthlySchedule');
                break;
            case '/my-account':
                setIsMyAccount(true);
                setIsCurrentState('MyAccount');
                dispatch(setHeaderLabel("My Account"))
                break;
            default:
                setIsHome(true);
                setIsCurrentState('Home');
        }
        /* eslint-enable */
    }, [location.pathname])

    const menuItems = [
        {
            label: 'Menu',
            isHeader: true
        },
        {
            id: 'Home',
            label: 'Home',
            icon: <Icons iconName={VEC_ICON_NAME.SIDEBAR_HOME_ICON} />,
            link: '/home',
            roles: [ROLES.NURSE, ROLES.ADMIN, ROLES.PT, ROLES.OT, ROLES.ST, ROLES.HHA, ROLES.RN, ROLES.LPN, ROLES.MSW, ROLES.DON, ROLES.ADMINISTRATOR, ROLES.COTA, ROLES.DSP, ROLES.LPTA, ROLES.QAPI, ROLES.HR, ROLES.RECEPTIONIST, ROLES.MARKETINGMANAGER, ROLES.CM],
            click: function () {
                setIsHome(true);
                setIsCurrentState('Home');
            },
            stateVariables: isHome,
            isUpperDivider: true
        },
        {
            id: 'nursedashboard',
            label: 'nursedashboard',
            icon: <Icons iconName={VEC_ICON_NAME.SIDEBAR_HOME_ICON} />,
            link: '/nursedashboard',
            roles: [ROLES.NURSE],
            click: function () {
                setIsNurseDashboard(true);
                setIsCurrentState('nursedashboard');
            },
            stateVariables: isNurseDashboard,
            isUpperDivider: true
        },
        {
            id: 'PatientManagement',
            label: 'Patient Management',
            icon: <Icons iconName={VEC_ICON_NAME.SIDEBAR_NEW_JOINER} />,
            link: '/patientmanagement',
            roles: [ROLES.ADMIN],
            click: function () {
                setIsNewPatient(true);
                setIsCurrentState('PatientManagement');
            },
            stateVariables: isNewPatient
        },
        {
            id: 'PhysicianManagement',
            label: 'Physician Management',
            icon: <Icons iconName={VEC_ICON_NAME.SIDEBAR_NEW_JOINER} />,
            link: '/physicianmanagement',
            roles: [ROLES.ADMIN],
            click: function () {
                setIsPhysicianManagement(true);
                setIsCurrentState('PhysicianManagement');
            },
            stateVariables: isPhysicianManagement
        },
        {
            id: 'StaffManagement',
            label: 'Staff Management',
            icon: <Icons iconName={VEC_ICON_NAME.SIDEBAR_NEW_JOINER} />,
            roles: [ROLES.ADMIN],
            click: function () {
                setIsNurseManagement(true);
                setIsCurrentState('StaffManagement');
            },
            subItems: [
                {
                    id: 'NurseManagement',
                    label: 'Nurse',
                    link: `/${STAFF_MANAGEMENT_ROUTES.STAFF_MANAGEMENT}/${STAFF_MANAGEMENT_ROUTES.CHILD_ROUTS.NURSE_LIST}`,
                    parentId: 'Schedule',
                    roles: [ROLES.ADMIN],
                    icon: <Icons iconName={VEC_ICON_NAME.SIDEBAR_TODAYS_TASKS} />,
                    stateVariables: isSubNurseManagement,
                    click: function () {
                        setIsSubNurseManagement(true);
                        setIsCurrentSubState('NurseManagement');
                    },
                },
                {
                    id: 'TherapistManagement',
                    label: 'Therapist',
                    link: `/${STAFF_MANAGEMENT_ROUTES.STAFF_MANAGEMENT}/${STAFF_MANAGEMENT_ROUTES.CHILD_ROUTS.THERAPIST_LIST}`,
                    parentId: 'Schedule',
                    roles: [ROLES.ADMIN],
                    icon: <Icons iconName={VEC_ICON_NAME.SIDEBAR_TODAYS_TASKS} />,
                    stateVariables: isSubTherapistManagement,
                    click: function () {
                        setIsSubTherapistManagement(true);
                        setIsCurrentSubState('TherapistManagement');
                    },
                },
                {
                    id: 'HHA&MSW',
                    label: 'HHA And MSW',
                    link: `/${STAFF_MANAGEMENT_ROUTES.STAFF_MANAGEMENT}/${STAFF_MANAGEMENT_ROUTES.CHILD_ROUTS.OTHER_LIST}`,
                    parentId: 'Schedule',
                    roles: [ROLES.ADMIN],
                    icon: <Icons iconName={VEC_ICON_NAME.SIDEBAR_TODAYS_TASKS} />,
                    stateVariables: isSubIsHHAAndMSW,
                    click: function () {
                        setIsSubIsHHAAndMSW(true);
                        setIsCurrentSubState('HHA&MSW');
                    },
                },
                {
                    id: 'InHouseStaff',
                    label: 'Office Staff',
                    link: `/${STAFF_MANAGEMENT_ROUTES.STAFF_MANAGEMENT}/${STAFF_MANAGEMENT_ROUTES.CHILD_ROUTS.IN_HOUSE_STAFF}`,
                    parentId: 'Schedule',
                    roles: [ROLES.ADMIN],
                    icon: <Icons iconName={VEC_ICON_NAME.SIDEBAR_TODAYS_TASKS} />,
                    stateVariables: isSubIsInHouseStaff,
                    click: function () {
                        setIsSubIsInHouseStaff(true);
                        setIsCurrentSubState('InHouseStaff');
                    },
                }
            ],
            stateVariables: isNurseManagement
        },
        {
            id: 'JobPosting',
            label: 'Jobs',
            icon: <Icons iconName={VEC_ICON_NAME.SIDEBAR_TODAYS_TASKS} />,
            roles: [ROLES.ADMIN],
            click: function () {
                setIsJobPosting(true);
                setIsCurrentState('JobPosting');
            },
            subItems: [
                {
                    id: 'JobApplications',
                    label: 'Job Applications',
                    link: `/${JOB_POSTING.JOBS}/${JOB_POSTING.CHILD_ROUTS.JOB_APPLICATIONS}`,
                    parentId: 'Schedule',
                    roles: [ROLES.ADMIN],
                    icon: <Icons iconName={VEC_ICON_NAME.SIDEBAR_TODAYS_TASKS} />,
                    stateVariables: isSubJobApplication,
                    click: function () {
                        setIsSubJobApplication(true);
                        setIsCurrentSubState('JobApplications');
                    },
                },
                {
                    id: 'JobApplications',
                    label: 'Job Postings',
                    link: `/${JOB_POSTING.JOBS}/${JOB_POSTING.CHILD_ROUTS.JOB_POSTING_LIST}`,
                    parentId: 'Schedule',
                    roles: [ROLES.ADMIN],
                    icon: <Icons iconName={VEC_ICON_NAME.SIDEBAR_TODAYS_TASKS} />,
                    stateVariables: isSubJobPosting,
                    click: function () {
                        setIsSubJobPosting(true);
                        setIsCurrentSubState('JobPostings');
                    },
                }
            ],
            stateVariables: isJobPosting
        },
        {
            id: 'Logout',
            label: 'Logout',
            icon: <Icons iconName={VEC_ICON_NAME.SIDEBAR_CONTACT_US_ICON} />,
            roles: [ROLES.NURSE, ROLES.ADMIN, ROLES.PT, ROLES.OT, ROLES.ST, ROLES.HHA, ROLES.RN, ROLES.LPN, ROLES.MSW, ROLES.DON, ROLES.ADMINISTRATOR, ROLES.COTA, ROLES.DSP, ROLES.LPTA, ROLES.QAPI, ROLES.HR, ROLES.RECEPTIONIST, ROLES.MARKETINGMANAGER],
            click: function () {
                dispatch(setIsLogout(true))
            },
            stateVariables: isLogout
        },
    ];
    return <React.Fragment>{menuItems}</React.Fragment>
};

export default NavData;
