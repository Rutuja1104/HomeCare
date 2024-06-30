import React from 'react'
import Label from '../../../../../components/label/labelV2/Label';
import { LABEL_WEIGHT } from '../../../../../components/label/labelV2/constants';
import moment from 'moment';
import RichGrid from '../../../../../components/richgrid/RichGrid';

const VitalSigns = ({ episodeDetails }) => {

    const TASK_DETAILS_COLUMNS = [
        {
            field: 'docDate',
            header: <Label weight={LABEL_WEIGHT[700]}>Doc Date</Label>,
            renderLogic: (row, idx) => (
                <span>
                    {moment(row?.created_at).format("MM-DD-YYYY")}
                </span>
            )
        },
        {
            field: 'Low BloodPressure',
            header: <Label weight={LABEL_WEIGHT[700]}>L BP</Label>,
            renderLogic: (row, idx) => <span>{row?.lowBloodPressure || '-'}</span>
        },
        {
            field: 'highBloodPressure',
            header: <Label weight={LABEL_WEIGHT[700]}>H BP</Label>,
            renderLogic: (row, idx) => <span>{row?.highBloodPressure || '-'}</span>
        },
        {
            field: 'highSystolic',
            header: <Label weight={LABEL_WEIGHT[700]}>H Systolic</Label>,
            renderLogic: (row, idx) => <span>{row?.highSystolic || '-'}</span>
        },
        {
            field: 'lowSystolic',
            header: <Label weight={LABEL_WEIGHT[700]}>L Systolic</Label>,
            renderLogic: (row, idx) => <span>{row?.lowSystolic || '-'}</span>
        },
        {
            field: 'highDiastolic',
            header: <Label weight={LABEL_WEIGHT[700]}>H Diastolic</Label>,
            renderLogic: (row, idx) => <span>{row?.highDiastolic || '-'}</span>
        },
        {
            field: 'lowDiastolic',
            header: <Label weight={LABEL_WEIGHT[700]}>L Diastolic</Label>,
            renderLogic: (row, idx) => <span>{row?.lowDiastolic || '-'}</span>
        },
        {
            field: 'highPulse',
            header: <Label weight={LABEL_WEIGHT[700]}>H Pulse</Label>,
            renderLogic: (row, idx) => <span>{row?.highPulse || '-'}</span>
        },
        {
            field: 'lowPulse',
            header: <Label weight={LABEL_WEIGHT[700]}>L Pulse</Label>,
            renderLogic: (row, idx) => <span>{row?.lowPulse || '-'}</span>
        },
        {
            field: 'highTemperature',
            header: <Label weight={LABEL_WEIGHT[700]}>H Temp</Label>,
            renderLogic: (row, idx) => <span>{row?.highTemperature || '-'}</span>
        },
        {
            field: 'lowTemperature',
            header: <Label weight={LABEL_WEIGHT[700]}>L Temp</Label>,
            renderLogic: (row, idx) => <span>{row?.lowTemperature || '-'}</span>
        },
        {
            field: 'highRespiratory',
            header: <Label weight={LABEL_WEIGHT[700]}>H Resp</Label>,
            renderLogic: (row, idx) => <span>{row?.highRespiratory || '-'}</span>
        },
        {
            field: 'highRespiratory',
            header: <Label weight={LABEL_WEIGHT[700]}>L Resp</Label>,
            renderLogic: (row, idx) => <span>{row?.lowRespiratory || '-'}</span>
        },
        {
            field: 'highBloodSugar',
            header: <Label weight={LABEL_WEIGHT[700]}>H Blood Sugar</Label>,
            renderLogic: (row, idx) => <span>{row?.highBloodSugar || '-'}</span>
        },
        {
            field: 'lowBloodSugar',
            header: <Label weight={LABEL_WEIGHT[700]}>L Blood Sugar</Label>,
            renderLogic: (row, idx) => <span>{row?.lowBloodSugar || '-'}</span>
        },
    ];

    return (
        <div className='me-5'>
            <RichGrid
                data={episodeDetails.Vitals}
                columns={TASK_DETAILS_COLUMNS}
                extractRowKey={(row) => row.phoneNumber}
                selectable={false}
            />
        </div>
    )
}

export default VitalSigns
