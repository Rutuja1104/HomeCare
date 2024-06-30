import React, { useEffect, useState } from 'react';
// import Loadable from '../../components/loadable/Loadable';
// import Container from '../../components/container/Container';
// import Button from '../../components/button/Button';
// import Label from '../../components/label/labelV2/Label';
// import Episodebox from './Episodebox/Episodebox';
import { CircularProgress, Typography } from '@mui/material';
// import DotToggleButton from '../../components/dotToggleButton/DotToggleButton';
// import MessagesList from './MessagesList/MessagesList';
// import ProfileImage from '../../components/profileImg/ProfileImage';
// import { setHeaderLabel } from '../../layouts/LayoutSlice';
import { useDispatch, useSelector } from 'react-redux';
// import { getClientEpisodeList } from '../episodeManagement/client/episodeListing/ClientEpisodeListingSaga';
import Episodebox from './Episodebox/Episodebox';
import Loadable from '../../../../components/loadable/Loadable';
import Container from '../../../../components/container/Container';
import Label from '../../../../components/label/labelV2/Label';
import Button from '../../../../components/button/Button';
import DotToggleButton from '../../../../components/dotToggleButton/DotToggleButton';
import General from '../../../../libs/utility/General';
import { setHeaderLabel } from '../../../../layouts/LayoutSlice';
import { getClientEpisodeList } from '../episodeListing/ClientEpisodeListingSaga';
import MessagesList from './MessagesList/MessagesList';
import { componentKey as clientEpisodeComponentKey, setPaginationState, setSelectedClientEpisodes } from "../../client/episodeListing/ClientEpisodeListingSlice"

// import ProfileImage from '../../../../components/profileImg/ProfileImage'
const agencyId = General.getLocalStorageData('agencyId');
const token = General.getLocalStorageData('token');
const userId = General.getLocalStorageData('userId');
const episodes = [
    {
        SSN: 123456789,
        Gender: 'Male',
        ProgramType: 'Medicare',
        dateOfBirth: 'Aug 31, 2023',
        phoneNumber: '+918149004238',
        email: 'surajzurange70@gmail.com',
        name: 'Mrs. Shirely Harvey'
    },
    {
        SSN: 123456789,
        Gender: 'Male',
        ProgramType: 'Medicare',
        dateOfBirth: 'Aug 31, 2023',
        phoneNumber: '+918149004238',
        email: 'surajzurange70@gmail.com',
        name: 'Mrs. Shirely Harvey'
    },
    {
        SSN: 123456789,
        Gender: 'Male',
        ProgramType: 'Medicare',
        dateOfBirth: 'Aug 31, 2023',
        phoneNumber: '+918149004238',
        email: 'surajzurange70@gmail.com',
        name: 'Mrs. Shirely Harvey'
    },
    {
        SSN: 123456789,
        Gender: 'Male',
        ProgramType: 'Medicare',
        dateOfBirth: 'Aug 31, 2023',
        phoneNumber: '+918149004238',
        email: 'surajzurange70@gmail.com',
        name: 'Mrs. Shirely Harvey'
    },
    {
        SSN: 123456789,
        Gender: 'Male',
        ProgramType: 'Medicare',
        dateOfBirth: 'Aug 31, 2023',
        phoneNumber: '+918149004238',
        email: 'surajzurange70@gmail.com',
        name: 'Mrs. Shirely Harvey'
    },
    {
        SSN: 123456789,
        Gender: 'Male',
        ProgramType: 'Medicare',
        dateOfBirth: 'Aug 31, 2023',
        phoneNumber: '+918149004238',
        email: 'surajzurange70@gmail.com',
        name: 'Mrs. Shirely Harvey'
    },
    {
        SSN: 123456789,
        Gender: 'Male',
        ProgramType: 'Medicare',
        dateOfBirth: 'Aug 31, 2023',
        phoneNumber: '+918149004238',
        email: 'surajzurange70@gmail.com',
        name: 'Mrs. Shirely Harvey'
    },
    {
        SSN: 123456789,
        Gender: 'Male',
        ProgramType: 'Medicare',
        dateOfBirth: 'Aug 31, 2023',
        phoneNumber: '+918149004238',
        email: 'surajzurange70@gmail.com',
        name: 'Mrs. Shirely Harvey'
    },
    {
        SSN: 123456789,
        Gender: 'Male',
        ProgramType: 'Medicare',
        dateOfBirth: 'Aug 31, 2023',
        phoneNumber: '+918149004238',
        email: 'surajzurange70@gmail.com',
        name: 'Mrs. Shirely Harvey'
    },
    {
        SSN: 123456789,
        Gender: 'Male',
        ProgramType: 'Medicare',
        dateOfBirth: 'Aug 31, 2023',
        phoneNumber: '+918149004238',
        email: 'surajzurange70@gmail.com',
        name: 'Mrs. Shirely Harvey'
    },
    {
        SSN: 123456789,
        Gender: 'Male',
        ProgramType: 'Medicare',
        dateOfBirth: 'Aug 31, 2023',
        phoneNumber: '+918149004238',
        email: 'surajzurange70@gmail.com',
        name: 'Mrs. Shirely Harvey'
    },
    {
        SSN: 123456789,
        Gender: 'Male',
        ProgramType: 'Medicare',
        dateOfBirth: 'Aug 31, 2023',
        phoneNumber: '+918149004238',
        email: 'surajzurange70@gmail.com',
        name: 'Mrs. Shirely Harvey'
    },
    {
        SSN: 123456789,
        Gender: 'Male',
        ProgramType: 'Medicare',
        dateOfBirth: 'Aug 31, 2023',
        phoneNumber: '+918149004238',
        email: 'surajzurange70@gmail.com',
        name: 'Mrs. Shirely Harvey'
    },
    {
        SSN: 123456789,
        Gender: 'Male',
        ProgramType: 'Medicare',
        dateOfBirth: 'Aug 31, 2023',
        phoneNumber: '+918149004238',
        email: 'surajzurange70@gmail.com',
        name: 'Mrs. Shirely Harvey'
    },
    {
        SSN: 123456789,
        Gender: 'Male',
        ProgramType: 'Medicare',
        dateOfBirth: 'Aug 31, 2023',
        phoneNumber: '+918149004238',
        email: 'surajzurange70@gmail.com',
        name: 'Mrs. Shirely Harvey'
    }
];

const messagesList = [
    {
        src: <img src={'../../../../../assets/images/profileImg.png'} />,
        name: 'Gabrial silva',
        message: 'hey hi there....',
        time: '03:12am'
    },
    {
        src: '',
        name: 'Gabrial silva',
        message: 'hey hi there....',
        time: '03:12am'
    },
    {
        src: '',
        name: 'Gabrial silva',
        message: 'hey hi there....',
        time: '03:12am'
    },
    {
        src: '',
        name: 'Gabrial silva',
        message: 'hey hi there....',
        time: '03:12am'
    },
    {
        src: '',
        name: 'Gabrial silva',
        message: 'hey hi there....',
        time: '03:12am'
    },
    {
        src: '',
        name: 'Gabrial silva',
        message: 'hey hi there....',
        time: '03:12am'
    }
];
const NurseDashboard = () => {
    const dispatch = useDispatch();
    const { clientEpisodeList, PaginationState, selectedClientEpisodes } = useSelector(state => state[clientEpisodeComponentKey])
    console.log("🚀 ~ NurseDashboard ~ clientEpisodeList:", clientEpisodeList)

    const [selectedBlock, setSelectedBlock] = useState(null);
    const statusColors = {
        'ON TRACK': '#4CAF50', // Green
        'NEED ATTENTION': '#FFC107', // Yellow
        'AT RISK': '#FF5722', // Red
        'NOT STARTED': '#607D8B' // Gray
    };

    const handleBlockClick = (blockIndex) => {
        setSelectedBlock(blockIndex);
    };

    useEffect(() => {
        dispatch(setHeaderLabel('Nurse Dashboard'));
        dispatch(getClientEpisodeList({ agencyId, userId, type: "nurse", status: PaginationState.Status, searchKey: PaginationState.FilterText, pageNumber: PaginationState.PageNumber, limit: PaginationState.PageSize, token }))

    }, []);
    const renderBlocks = () => {
        const weekdays = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];

        return weekdays.map((day, index) => (
            <div
                key={index}
                className={`block ${selectedBlock === index ? 'selected' : ''}`}
                onClick={() => handleBlockClick(index)}
                style={{ border: '1px solid #e9e9e9' }}
            >
                {day}
            </div>
        ));
    };
    let progressValue = 72;
    return (
        <Loadable>
            <Container>
                <div className="nurseDashboardConatiner">
                    <div className="title">
                        <div className="title-block1">
                            <div className="">
                                <h1>
                                    Good morning, Lisa
                                    {/* {greeting}, {agencyDetails?.name || '-'} */}
                                </h1>
                                <p>How are you doing? Track your today's Tasks.</p>
                                <Button>Web Check-in</Button>
                            </div>
                        </div>
                        <div className="title-block2">
                            <Label>Schedules</Label>
                            <div className="weekdays">{renderBlocks()}</div>
                            <div className="mt-2">
                                <p>Today (10:00 AM - 11:00 AM)</p>
                                <div className="patient-assignee">
                                    <div>
                                        <Label>Patient Name</Label>
                                        <p>Mary Claire</p>
                                    </div>
                                    <div>
                                        <Label>Assignee</Label>
                                        <p>Dr. Hans Ramore</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="episodes">
                        <div className="episode-list-container">
                            <Label>Episodes</Label>
                            <div className="episodes-list">
                                {episodes.map((item, index) => (
                                    <Episodebox
                                        key={index}
                                        SSN={item?.SSN}
                                        Gender={item?.Gender}
                                        ProgramType={item?.ProgramType}
                                        dateOfBirth={item?.dateOfBirth}
                                        phoneNumber={item?.phoneNumber}
                                        email={item?.email}
                                        name={item?.name}
                                    />
                                ))}
                            </div>
                        </div>
                        <div className="progress-box">
                            <div>
                                <Label>Overall Progress</Label>
                                <div className="d-flex justify-content-between circular-prgress">
                                    <div style={{ position: 'relative', width: '100px', height: '100px' }}>
                                        <CircularProgress
                                            variant="determinate"
                                            value={progressValue}
                                            thickness={4}
                                            size={100}
                                        />
                                        <Typography
                                            variant="h6"
                                            component="div"
                                            style={{
                                                position: 'absolute',
                                                top: '50%',
                                                left: '50%',
                                                transform: 'translate(-50%, -50%)',
                                                color: '#000'
                                            }}
                                        >
                                            {`${progressValue}%`}
                                        </Typography>
                                    </div>

                                    <div className="">
                                        <ul className="custom-list">
                                            {['ON TRACK', 'NEED ATTENTION', 'AT RISK', 'NOT STARTED'].map(
                                                (item, index) => (
                                                    <li key={index}>
                                                        <div className="d-flex justify-content-between">
                                                            {item}
                                                            <p className="ml-2">{1}</p>
                                                        </div>
                                                    </li>
                                                )
                                            )}
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <div className="messages-container">
                                <div className="d-flex justify-content-between title">
                                    <span>Messages</span>
                                    <DotToggleButton />
                                </div>
                                <div>
                                    {messagesList.map((item, index) => (
                                        <MessagesList
                                            src={item?.src}
                                            name={item?.name}
                                            message={item?.message}
                                            time={item?.time}
                                            key={index}
                                        />
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Container>
        </Loadable>
    );
};
export default NurseDashboard;
