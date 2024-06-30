import React from 'react'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'

const ReactFullCalendar = ({
    weekendsVisible = true,
    currentEvents = [],
    handleDates = () => { },
    handleDateSelect = () => { },
    events,
    plugins = [dayGridPlugin, timeGridPlugin, interactionPlugin]
}) => {
    return (
        <FullCalendar
            plugins={plugins}
            headerToolbar={{
                left: 'title,prev,next today',
                center: '',
                right: 'dayGridMonth,timeGridWeek,timeGridDay'
            }}
            initialView='dayGridMonth'
            editable={true}
            selectable={true}
            selectMirror={true}
            dayMaxEvents={true}
            weekends={weekendsVisible}
            eventSources={[events]}
            select={handleDateSelect}
        />
    )
}

export default ReactFullCalendar
