import React, { useEffect, useState } from 'react';
import Container from '../../components/container/Container';
import { useDispatch, useSelector } from 'react-redux';
import { setNavigateToHomed } from '../Authentication/AuthenticationSlice';
import { setHeaderLabel } from '../../layouts/LayoutSlice';
import Icons from '../../components/icon/Icon';
import { VEC_ICON_NAME } from '../../components/icon/constants';
import CountBox from './components/ CounteBox';
import EpisodeCount from './components/EpisodeCount';
import Heading from '../../components/heading/Heading';
import { HEADING } from '../../components/heading/constants/constants';
import SceduledTasksBox from './components/SceduledTasksBox';
import RichGrid from '../../components/richgrid/RichGrid';
// import SelectDropdown from '../../components/dropdown/selectdropdown/SelectDropdown';
import AlertsBox from './components/AlertsBox';
import { componentKey, setAlertsOptions } from './HomeSlice';
import {
    getEpisodeByStatus,
    getJobApplicationCount,
    getPatientOnBoardingCount,
    getPatientsBirthdayList,
    getPendingClaimsCount,
    getAgencyDetails,
    getScheduledTasksList
} from './HomeSaga';
import { useNavigate } from 'react-router-dom';
import Loadable from '../../components/loadable/Loadable';
import moment from 'moment';
import SelectDropdown from '../../components/select/Select';
import General from '../../libs/utility/General';
import { setPaginationState } from '../PatientManagement/referral-intake/PatientManagementSlice';

// const List = ['Skilled Nurse', 'Physical Therapy', 'Occupational Therapy', 'Speech Therapy', 'Medical Social Worker'];

const ALERTS_BOX = [
    {
        img: '',
        name: 'Lucas, Ben',
        title: 'Nurse Certification Renewal',
        dateOfOnBoard: 'May 15, 2024',
        hoursLeft: ''
    },
    {
        img: '',
        name: 'Lucas, Ben',
        title: 'OASIS Task Action',
        dateOfOnBoard: 'May 16, 2024',
        hoursLeft: '5hr Left'
    },
    {
        img: '',
        name: 'Lucas, Ben',
        title: '',
        dateOfOnBoard: 'May 16, 2024',
        hoursLeft: '5hr Left'
    },
    {
        img: '',
        name: 'Lucas, Ben',
        title: '',
        dateOfOnBoard: 'May 16, 2024',
        hoursLeft: '5hr Left'
    },
    {
        img: '',
        name: 'Lucas, Ben',
        title: '',
        dateOfOnBoard: 'May 16, 2024',
        hoursLeft: '5hr Left'
    },
    {
        img: '',
        name: 'Lucas, Ben',
        title: '',
        dateOfOnBoard: 'May 16, 2024',
        hoursLeft: '5hr Left'
    },
    {
        img: '',
        name: 'Lucas, Ben',
        title: '',
        dateOfOnBoard: 'May 16, 2024',
        hoursLeft: '5hr Left'
    },
    {
        img: '',
        name: 'Lucas, Ben',
        title: '',
        dateOfOnBoard: 'May 16, 2024',
        hoursLeft: '5hr Left'
    }
];

const Home = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {
        episodeByStatus,
        patientsBirthdayList,
        jobApplicationCount,
        patientOnBoardedCount,
        pendingClaimsCount,
        alertOptions,
        agencyDetails,
        loadingState,
        scheduledTaskList
    } = useSelector((state) => state[componentKey]);
    const [greeting, setGreeting] = useState('');
    const token = General.getLocalStorageData('token');

    useEffect(() => {
        const currentHour = new Date().getHours();
        if (currentHour >= 5 && currentHour < 12) {
            setGreeting('Good Morning');
        } else if (currentHour >= 12 && currentHour < 18) {
            setGreeting('Good Afternoon');
        } else {
            setGreeting('Good Evening');
        }
    }, []);
    const agencyId = General.getLocalStorageData('agencyId');
    useEffect(() => {
        dispatch(setNavigateToHomed(false));
        dispatch(setHeaderLabel('Agency Dashboard'));
        dispatch(getEpisodeByStatus(agencyId));
        dispatch(getPatientsBirthdayList(agencyId));
        dispatch(getJobApplicationCount(agencyId));
        dispatch(getPatientOnBoardingCount(agencyId));
        dispatch(getPendingClaimsCount(agencyId));
        dispatch(getAgencyDetails(agencyId));
        dispatch(getScheduledTasksList(agencyId));
    }, []);

    const roles = [
        { label: 'Nurse', value: 'Nurse' },
        { label: 'Patient', value: 'Patient' }
    ];
    const ASSIGN_MEMBER_COLUMNS = [
        {
            field: 'birthday',
            header: 'Birthday',
            renderLogic: (row, idx) => <span>{row?.dateOfBirth || '-'}</span>
        },
        {
            field: 'name',
            header: 'Name',
            renderLogic: (row, idx) => <span>{row?.name || '-'}</span>
        },
        {
            field: 'age',
            header: 'Age',
            renderLogic: (row, idx) => <span>{row?.age || '-'}</span>
        },
        {
            field: 'phoneNo',
            header: 'Phone No',
            renderLogic: (row, idx) => <span>{row?.phoneNumber || '-'}</span>
        }
    ];
    const [clickedIndex, setClickedIndex] = useState(null);

    const handleSpanClick = (index) => {
        setClickedIndex(index === clickedIndex ? null : index);
    };

    return (
        <Loadable loadingStates={loadingState.state} loadingMessage={loadingState.message}>
            <Container>
                <div className="agencyDashboardConatiner">
                    <div className="title">
                        <div className="title-block1">
                            <div className="">
                                <h1>
                                    {greeting}, {agencyDetails?.name || '-'}
                                </h1>
                                <p>How are you doing? Track your Analytical Stats & Tasks.</p>
                                <p
                                    className=""
                                    style={{ color: '#087D9E', cursor: 'pointer', textDecoration: 'underline' }}
                                    onClick={() => navigate('/my-account')}
                                >
                                    See Agency Details{' '}
                                    <span>
                                        <Icons iconName={VEC_ICON_NAME.ARROW_RIGHT_ICON}></Icons>
                                    </span>
                                </p>
                            </div>
                        </div>
                        <div className="title-block2">
                            <CountBox iconName={VEC_ICON_NAME.PATIENT_ONBOARDING} title={'Patient Onboarding'}>
                                <p className="mb-4">
                                    You have {patientOnBoardedCount?.count || '-'} Patient Onboarding approval to do.
                                </p>
                                <div className="">
                                    <p
                                        className=""
                                        style={{ color: '#087D9E', cursor: 'pointer', textDecoration: 'underline' }}
                                        onClick={() => {
                                            navigate(`/patientmanagement`);
                                            dispatch(setPaginationState({ status: 'Active' }));
                                        }}
                                    >
                                        See all Patients
                                        <span>
                                            <Icons iconName={VEC_ICON_NAME.ARROW_RIGHT_ICON}></Icons>
                                        </span>
                                    </p>
                                </div>
                            </CountBox>
                            <CountBox iconName={VEC_ICON_NAME.JOB_APPLICATION_ICON} title={'Job Applications'}>
                                <p className="" style={{ fontSize: '28px', marginTop: '10px' }}>
                                    {jobApplicationCount?.count || '-'}
                                </p>
                                <span>review for hiring</span>
                                <div className="">
                                    <p
                                        className=""
                                        style={{ color: '#087D9E', cursor: 'pointer', textDecoration: 'underline' }}
                                        onClick={() => {
                                            navigate(`/jobs/job-applications`);
                                        }}
                                    >
                                        See all Applications
                                        <span>
                                            <Icons iconName={VEC_ICON_NAME.ARROW_RIGHT_ICON}></Icons>
                                        </span>
                                    </p>
                                </div>
                            </CountBox>
                        </div>
                    </div>
                    <div className="episode-count-container">
                        <div className="block1">
                            <div className="block" style={{ borderRight: '1px solid #E9E9E9' }}>
                                <EpisodeCount className="" title={'Total Episodes'} totalPercentage={''}>
                                    <p className="" style={{ fontWeight: 'bold', color: '#393939', fontSize: '24px' }}>
                                        {episodeByStatus?.totalCount || '-'}
                                    </p>
                                </EpisodeCount>
                            </div>
                            <div className="block" style={{ borderRight: '1px solid #E9E9E9' }}>
                                <EpisodeCount
                                    className=""
                                    percentage={true}
                                    title={'Open Episodes '}
                                    totalPercentage={`${episodeByStatus?.openStatusPercentage}`}
                                >
                                    <p className="" style={{ fontWeight: 'bold', color: '#393939', fontSize: '24px' }}>
                                        {episodeByStatus?.openStatusCount || '-'}
                                    </p>
                                </EpisodeCount>
                            </div>
                            <div className="block">
                                <EpisodeCount
                                    className=""
                                    percentage={true}
                                    title={'Closed Episodes '}
                                    totalPercentage={`${episodeByStatus?.closedStatusPercentage} `}
                                >
                                    <p className="" style={{ fontWeight: 'bold', color: '#393939', fontSize: '24px' }}>
                                        {episodeByStatus?.closedStatusCount || '-'}
                                    </p>
                                </EpisodeCount>
                            </div>
                        </div>
                        <div className="block2">
                            <div>
                                <p
                                    style={{
                                        fontWeight: 'bold',
                                        color: '#087D9E',
                                        cursor: 'pointer',
                                        textDecoration: 'underline'
                                    }}
                                >
                                    {/* <Icons iconName={VEC_ICON_NAME.PENDING_CLAIMS} /> */}
                                    Pending Claims
                                </p>
                            </div>
                            <div>
                                <p className="" style={{ marginBottom: '0', marginLeft: '10px' }}>
                                    <span style={{ fontWeight: 'bold', color: '#393939', fontSize: '24px' }}>
                                        {pendingClaimsCount?.count}
                                    </span>{' '}
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="multiple-tasks">
                        <div className="sceduledTasks">
                            <Heading type={HEADING.h3} customStyle={{ color: '#727272' }}>
                                Scheduled Tasks
                            </Heading>
                            <div className="tasks">
                                {scheduledTaskList.map((item, index) => (
                                    <SceduledTasksBox
                                        key={index}
                                        scheduledStatus={item?.status}
                                        img={item?.img}
                                        name={item?.assigneeName}
                                        discription={item?.comment}
                                        dateOfScheduled={moment(item?.scheduleDate).format('MM-DD-YYYY')}
                                    />
                                ))}
                            </div>
                        </div>
                        <div className="clientInfoBlock">
                            <div className="birthdays-block">
                                <Heading type={HEADING.h3} customStyle={{ color: '#727272' }}>
                                    Client Birthdays
                                </Heading>
                                <div className="birthday-table">
                                    <RichGrid
                                        data={patientsBirthdayList}
                                        columns={ASSIGN_MEMBER_COLUMNS}
                                        selectable={false}
                                        extractRowKey={(row) => row.name}
                                    />
                                </div>
                            </div>
                            <div className="agency-service">
                                <div className="title-bar">
                                    <div>
                                        <Heading type={HEADING.h3} customStyle={{ color: '#727272' }}>
                                            Agency Services
                                        </Heading>
                                    </div>
                                    <div className="skilled-unskilled">
                                        <span
                                            className={clickedIndex === 0 ? 'clicked' : ''}
                                            onClick={() => handleSpanClick(0)}
                                        >
                                            Skilled
                                        </span>
                                        <span
                                            className={clickedIndex === 1 ? 'clicked' : ''}
                                            onClick={() => handleSpanClick(1)}
                                        >
                                            Unskilled
                                        </span>
                                    </div>
                                </div>
                                {agencyDetails?.services?.map((item, index) => (
                                    <div key={index} className="lists">
                                        <Icons iconName={VEC_ICON_NAME.CORRECT_ICON} />
                                        <span>{item?.type}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="alert">
                            <div className="title-bar">
                                <Heading type={HEADING.h3} customStyle={{ color: '#727272', marginTop: '10px' }}>
                                    Alerts
                                </Heading>
                                <div className="dropdown-alert">
                                    <SelectDropdown
                                        name="roles"
                                        options={roles}
                                        value={alertOptions.roles}
                                        defaultValue={alertOptions.roles.length ? { label: alertOptions.roles } : ''}
                                    />
                                </div>
                            </div>
                            <div className="alerts-role-wise">
                                {ALERTS_BOX.map((item, index) => (
                                    <AlertsBox
                                        key={index}
                                        img={item?.img}
                                        name={item?.name}
                                        title={item?.title}
                                        dateOfOnBoard={item?.dateOfOnBoard}
                                        hoursLeft={item?.hoursLeft}
                                    />
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </Container>
        </Loadable>
    );
};

export default Home;