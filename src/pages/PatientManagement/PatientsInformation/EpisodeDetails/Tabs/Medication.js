import React from 'react'
import RichGrid from '../../../../../components/richgrid/RichGrid'
import Label from '../../../../../components/label/labelV2/Label';
import { LABEL_WEIGHT } from '../../../../../components/label/labelV2/constants';
import BadgeV2 from '../../../../../components/badge/BadgeV2';
import moment from 'moment';

const Medication = ({ episodeDetails }) => {

    const TASK_DETAILS_COLUMNS = [
        {
            field: 'DrugName',
            header: <Label weight={LABEL_WEIGHT[700]}>Drug Name</Label>,
            renderLogic: (row, idx) => <span>{row?.drugName}</span>
        },
        {
            field: 'DosageUnits',
            header: <Label weight={LABEL_WEIGHT[700]}>Dosage Units</Label>,
            renderLogic: (row, idx) => <span>{row?.dosageUnits || '-'}</span>
        },
        {
            field: 'start Date',
            header: <Label weight={LABEL_WEIGHT[700]}>Start Date</Label>,
            renderLogic: (row, idx) => <span>{moment(row?.startDate).format('MM-DD-YYYY')}</span>
        },
        {
            field: 'stop Date',
            header: <Label weight={LABEL_WEIGHT[700]}>Stop Date</Label>,
            renderLogic: (row, idx) => <span>{moment(row?.discontinuedDate).format('MM-DD-YYYY')}</span>
        },
        {
            field: 'class',
            header: <Label weight={LABEL_WEIGHT[700]}>Class</Label>,
            renderLogic: (row, idx) => <span>{row?.class || '-'}</span>
        },
        {
            field: 'Status',
            header: <Label weight={LABEL_WEIGHT[700]}>Status</Label>,
            renderLogic: (row, idx) => <BadgeV2>{row?.status || '-'}</BadgeV2>
        }
    ];
    return (
        <div>
            <RichGrid
                data={episodeDetails.Medication}
                columns={TASK_DETAILS_COLUMNS}
                extractRowKey={(row) => row.phoneNumber}
                selectable={false}
            />
        </div>
    )
}

export default Medication
