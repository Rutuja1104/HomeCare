import React from 'react'
import Label from '../../../../../components/label/labelV2/Label';
import { LABEL_WEIGHT } from '../../../../../components/label/labelV2/constants';
import moment from 'moment';
import General from '../../../../../libs/utility/General';
import BadgeV2 from '../../../../../components/badge/BadgeV2';
import RichGrid from '../../../../../components/richgrid/RichGrid';

const PacketForms = ({ episodeDetails }) => {
    console.log(episodeDetails)
    const FORMS_COLUMNS = [
        {
            field: "formName",
            header: <Label weight={LABEL_WEIGHT[700]}>Form Name</Label>,
            renderLogic: (row, idx) => <span>{row?.formName}</span>,
        },
        {
            field: "filledDate",
            header: <Label weight={LABEL_WEIGHT[700]}>Filled Date</Label>,
            renderLogic: (row, idx) => <span>{row.fillDate && moment(row.fillDate).format("LL") || ""}</span>,
        },
        {
            field: "filledBy",
            header: <Label weight={LABEL_WEIGHT[700]}>Filled By</Label>,
            renderLogic: (row, idx) => <span>{row?.filledBy}</span>,
        },
        {
            field: "status",
            header: <Label weight={LABEL_WEIGHT[700]}>Status</Label>,
            renderLogic: (row, idx) => (
                <BadgeV2 color={General.renderBadgeColor(row?.status || "")}>{row?.status}</BadgeV2>
            ),
        }
    ];

    return (
        <div>
            <RichGrid
                data={episodeDetails.EpisodeForms}
                columns={FORMS_COLUMNS}
                extractRowKey={(row) => row.phoneNumber}
                selectable={false}
            />
        </div>
    )
}

export default PacketForms
