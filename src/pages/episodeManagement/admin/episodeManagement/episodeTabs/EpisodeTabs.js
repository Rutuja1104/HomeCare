import React from 'react'
import TabbedNavigationWIcon from '../../../../../components/tabbedNavigation/TabbedNavigationWIcon';
import { VEC_ICON_NAME } from '../../../../../components/icon/constants';
import Episode from './episode/Episode';
import TaskList from './taskList/TaskList';
import ProgressNotes from './progressNotes/ProgressNotes';
import Schedule from "./schedule/Schedule"
import Medications from './medications/Medications';
import VitalSigns from './vitalSigns/VitalSigns';
import FormsList from './packetForms/FormList';
import { useSearchParams } from 'react-router-dom';

const EpisodeTabs = () => {

    const [searchParams, setSearchParams] = useSearchParams();
    const activeTab = searchParams.get("at")

    const tabList = [
        {
            title: "Episode",
            tabBodyComponent: <Episode />,
            linkTo: "/tab1",
            icon: VEC_ICON_NAME.EPISODE_ICON
        },
        {
            title: "Scheduled",
            tabBodyComponent: <Schedule />,
            linkTo: "/tab2",
            icon: VEC_ICON_NAME.SCHEDULE_ICON
        },
        {
            title: "Task List",
            tabBodyComponent: <TaskList />,
            linkTo: "/tab2",
            icon: VEC_ICON_NAME.TASK_LIST_ICON
        },
        {
            title: "Progress Notes",
            tabBodyComponent: <ProgressNotes />,
            linkTo: "/tab2",
            icon: VEC_ICON_NAME.PROGRESS_NOTES_ICON
        },
        {
            title: "Medications",
            tabBodyComponent: <Medications />,
            linkTo: "/tab2",
            icon: VEC_ICON_NAME.MEDICATION_ICON
        },
        {
            title: "Vital Signs",
            tabBodyComponent: <VitalSigns />,
            linkTo: "/tab2",
            icon: VEC_ICON_NAME.VITAL_SIGNS_ICON
        },
        {
            title: "Claims",
            tabBodyComponent: <p>Claims</p>,
            linkTo: "/tab2",
            icon: VEC_ICON_NAME.CLAIMS_ICON
        },
        {
            title: "Packet Forms",
            tabBodyComponent: <FormsList />,
            linkTo: "/tab2",
            icon: VEC_ICON_NAME.PACKET_ICON
        }
    ];

    return (
        <TabbedNavigationWIcon tabList={tabList} isContainer={false} activeTabIndex={+activeTab} />
    )
}

export default EpisodeTabs
