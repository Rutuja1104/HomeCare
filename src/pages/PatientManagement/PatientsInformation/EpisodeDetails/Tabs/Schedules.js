import React from 'react'
import ReactFullCalendar from '../../../../../components/reactFullCalendar/ReactFullCalendar'
import moment from 'moment'

const Schedules = ({ episodeDetails }) => {

    const filteredData = episodeDetails?.TaskSchedules?.map(item => (
        {
            title: `Scheduled`,
            start: `${moment(item?.date).format("YYYY-MM-DD")} ${moment(`${moment(item?.date).format("YYYY-MM-DD")} ${item?.inTime}`).format("HH:mm")}:00`,
            end: `${moment(item?.date).format("YYYY-MM-DD")} ${moment(`${moment(item?.date).format("YYYY-MM-DD")} ${item?.outTime}`).format("HH:mm")}:00`
        }
    ))

    return (
        <div className='me-4'>
            <ReactFullCalendar events={filteredData} />
        </div>
    )
}

export default Schedules
