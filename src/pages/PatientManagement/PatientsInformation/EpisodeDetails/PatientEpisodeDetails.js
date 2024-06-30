import React, { useState } from 'react'
import { VEC_ICON_NAME } from '../../../../components/icon/constants';
import Icons from '../../../../components/icon/Icon';
import { Offcanvas, OffcanvasBody, OffcanvasHeader } from 'reactstrap';
import EpisodeDetails from './Tabs/EpisodeDetails';
import Schedules from './Tabs/Schedules';
import TaskList from './Tabs/TaskList';
import ProgressNotes from './Tabs/ProgressNotes';
import Medication from './Tabs/Medication';
import VitalSigns from './Tabs/VitalSigns';
import PacketForms from './Tabs/PacketForms';

const PatientEpisodeDetails = ({ isOpen, toggle, episodeDetails }) => {
    const [selectedTab, setSelectedTab] = useState(0)

    const sideBarOptions = [
        {
            id: 0,
            title: "Episode Details",
            tabBodyComponent: <EpisodeDetails episodeDetails={episodeDetails} />,
            linkTo: "/tab1",
        },
        {
            id: 1,
            title: "Schedules",
            tabBodyComponent: <Schedules episodeDetails={episodeDetails} />,
            linkTo: "/tab1",
        },
        {
            id: 2,
            title: "Task List",
            tabBodyComponent: <TaskList episodeDetails={episodeDetails} />,
            linkTo: "/tab1",
        },
        {
            id: 3,
            title: "Progress Notes",
            tabBodyComponent: <ProgressNotes episodeDetails={episodeDetails} />,
            linkTo: "/tab2",
        },
        {
            id: 3,
            title: "Medications",
            tabBodyComponent: <Medication episodeDetails={episodeDetails} />,
            linkTo: "/tab2",
        },
        {
            id: 3,
            title: "Vital Signs",
            tabBodyComponent: <VitalSigns episodeDetails={episodeDetails} />,
            linkTo: "/tab2",
        },
        {
            id: 3,
            title: "Packet Forms",
            tabBodyComponent: <PacketForms episodeDetails={episodeDetails} />,
            linkTo: "/tab2",
        },
    ];
    return (


        <Offcanvas
            isOpen={isOpen}
            direction="end"
            toggle={toggle}
            style={{ width: "60%" }}
        >
            <OffcanvasHeader toggle={toggle}>
                Episode Details
            </OffcanvasHeader>
            <OffcanvasBody style={{ padding: "0" }}>
                <div className="taskAssesment-container-new">
                    <div className="messages-container-new" >
                        <div className="messages-leftSection">
                            <div className="taskAssesment-messages-leftSection taskAssesment-messages-cardContainer">
                                {sideBarOptions.map((value, index) => {
                                    return (
                                        <div
                                            className={index == selectedTab ? "taskAssesment-sideBarIndividualElementSelected" : "taskAssesment-sideBarIndividualElement"}
                                            key={index}
                                            style={{ paddingLeft: "20px" }}
                                            onClick={() => setSelectedTab(index)}
                                        >
                                            <span>{value.title}</span>
                                            <span style={{ float: "right" }}>
                                                <Icons iconName={VEC_ICON_NAME.RightArrow} />
                                            </span>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                    <div className="messages-rightSection-outer-container">
                        {sideBarOptions.map((data, index) => {
                            return index == selectedTab ? <React.Fragment key={index}>{data.tabBodyComponent}</React.Fragment> : null
                        })}
                    </div>
                </div>
            </OffcanvasBody>
        </Offcanvas>
    )
}

export default PatientEpisodeDetails
