import React from 'react'
import Label from '../../../../../components/label/labelV2/Label'
import { LABEL_WEIGHT } from '../../../../../components/label/labelV2/constants'
import moment from 'moment'
import BadgeV2 from '../../../../../components/badge/BadgeV2'
import General from '../../../../../libs/utility/General'
import RichGrid from '../../../../../components/richgrid/RichGrid'

const ProgressNotes = ({ episodeDetails }) => {

    const TASK_DETAILS_COLUMNS = [
        {
            field: "userName",
            header: <Label weight={LABEL_WEIGHT[700]}>Note Type</Label>,
            renderLogic: (row, idx) => <span>{row?.firstName} {row?.noteType || "-"}</span>
        },
        {
            field: "userName",
            header: <Label weight={LABEL_WEIGHT[700]}>Note Date</Label>,
            renderLogic: (row, idx) => <span>{moment(row.noteDate).format("LL")}</span>
        },
        {
            field: "userName",
            header: <Label weight={LABEL_WEIGHT[700]}>Comment</Label>,
            renderLogic: (row, idx) => <span>{row?.comment || "-"}</span>
        },
        {
            field: "userName",
            header: <Label weight={LABEL_WEIGHT[700]}>Status</Label>,
            renderLogic: (row, idx) => <BadgeV2 color={General.renderBadgeColor(row?.status || "")}>{row?.status}</BadgeV2>
        }
    ]

    return (
        <div>
            <RichGrid
                data={episodeDetails.Notes}
                columns={TASK_DETAILS_COLUMNS}
                extractRowKey={(row) => row.phoneNumber}
                selectable={false}
            />
        </div>
    )
}

export default ProgressNotes
