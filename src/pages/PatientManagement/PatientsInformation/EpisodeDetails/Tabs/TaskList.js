import React from 'react'
import { LABEL_WEIGHT } from '../../../../../components/label/labelV2/constants'
import Label from '../../../../../components/label/labelV2/Label'
import General from '../../../../../libs/utility/General'
import BadgeV2 from '../../../../../components/badge/BadgeV2'
import RichGrid from '../../../../../components/richgrid/RichGrid'

const TaskList = ({ episodeDetails }) => {

    const TASK_DETAILS_COLUMNS = [
        {
            field: "userName",
            header: <Label weight={LABEL_WEIGHT[700]}>Task Type</Label>,
            renderLogic: (row, idx) => <span>{row?.firstName} {row?.taskType}</span>
        },
        {
            field: "userName",
            header: <Label weight={LABEL_WEIGHT[700]}>Task Name</Label>,
            renderLogic: (row, idx) => <span>{row?.taskName}</span>
        },
        {
            field: "userName",
            header: <Label weight={LABEL_WEIGHT[700]}>Employee Name</Label>,
            renderLogic: (row, idx) => <span>{row?.assigneeName}</span>
        },
        {
            field: "userName",
            header: <Label weight={LABEL_WEIGHT[700]}>Status</Label>,
            renderLogic: (row, idx) => <BadgeV2 color={General.renderBadgeColor(row?.status || "")}>{row?.status}</BadgeV2>
        }
    ]

    return (
        <React.Fragment>
            <RichGrid
                data={episodeDetails.Task}
                columns={TASK_DETAILS_COLUMNS}
                extractRowKey={(row) => row.phoneNumber}
                selectable={false}
            />
        </React.Fragment>
    )
}

export default TaskList
