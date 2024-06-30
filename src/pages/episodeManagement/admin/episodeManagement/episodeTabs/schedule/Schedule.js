import React, { useEffect, useState } from 'react'

import { useDispatch, useSelector } from 'react-redux'
import { componentKey } from '../../AdminEpisodeManagementSlice'

import ReactFullCalendar from '../../../../../../components/reactFullCalendar/ReactFullCalendar'
import Container from '../../../../../../components/container/Container'
import { getSchedulesByEpisode } from '../../AdminEpisodeManagementSaga'
import { useParams } from 'react-router-dom'
import General from '../../../../../../libs/utility/General'

const Schedule = () => {

    const dispatch = useDispatch()
    const { scheduleEpisodeTaskList } = useSelector(state => state[componentKey])

    const [isLoading, setIsLoading] = useState(false)

    const { episodeId } = useParams()
    const agencyId = General.getLocalStorageData("agencyId")
    const token = General.getLocalStorageData("token")

    useEffect(() => {
        const calendar = document.getElementsByClassName("fc-view-harness")[0];
        if (calendar) {
            calendar.style.height = "1151.85px";
        }

        window.setTimeout(() => {
            setIsLoading(true)
            window.dispatchEvent(new Event('resize'));
        }, 1000);
        return () => {
            setIsLoading(false)
        }
    });

    useEffect(() => {
        dispatch(getSchedulesByEpisode({ episodeId, agencyId, token, nurseId: "", staffId: "" }))
    }, [])

    return (
        <React.Fragment>
            <Container>
                <ReactFullCalendar events={scheduleEpisodeTaskList} />
            </Container>
        </React.Fragment>
    )
}

export default Schedule
