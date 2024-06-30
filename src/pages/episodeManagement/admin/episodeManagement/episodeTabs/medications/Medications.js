import React, { useEffect } from 'react';
import moment from 'moment';

import { BUTTON_TYPE } from '../../../../../../libs/constant';
import { VEC_ICON_NAME } from '../../../../../../components/icon/constants';
import { useDispatch, useSelector } from 'react-redux';
import { LABEL_WEIGHT } from '../../../../../../components/label/labelV2/constants';
import { deleteMedication, getAllMedications } from '../../AdminEpisodeManagementSaga';
import { useNavigate, useParams } from 'react-router-dom';
import { componentKey, setMedicationPaginationState, setSelectedMedicationToDelete, setSelectedMedications, setShowDeleteMedicationModal } from '../../AdminEpisodeManagementSlice';
import { EPISODE_MANAGEMENT } from '../../../../../../routes/constants';

import ButtonDropdown from '../../../../../../components/buttonDropdown/ButtonDropdown';
import RichGrid from '../../../../../../components/richgrid/RichGrid';
import Label from '../../../../../../components/label/labelV2/Label';
import UncontrolledDropdownV2 from '../../../../../../components/uncontrolledDropdown/UncontrolledDropdown';
import BadgeV2 from '../../../../../../components/badge/BadgeV2';
import ConfirmationModal from '../../../../../../components/models/ConfirmationModal';
import General from '../../../../../../libs/utility/General';

const Medications = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { episodeId } = useParams();
    const agencyId = General.getLocalStorageData('agencyId');
    const token = General.getLocalStorageData('token');

    const { medications, selectedMedications, MedicationPaginationState, showDeleteMedicationModal, selectedMedicationToDelete } = useSelector((state) => state[componentKey]);

    useEffect(() => {
        dispatch(getAllMedications({ agencyId, episodeId, token, PageNumber: MedicationPaginationState.PageNumber, limit: MedicationPaginationState.PageSize }));
    }, []);

    const ACTION_BUTTONS = [
        {
            text: 'View',
            onClickCb: (row) => {
                navigate(`/${EPISODE_MANAGEMENT.EPISODE_MANAGEMENT}/${EPISODE_MANAGEMENT.CHILD_ROUTS.ADD_NEW_MEDICATION}/${episodeId}?mi=${row.id}`)
            }
        },
        // {
        //     text: 'Delete',
        //     // disabled: (row) => row.status === "Open",
        //     onClickCb: (row) => {
        //         dispatch(setSelectedMedicationToDelete(row))
        //         dispatch(setShowDeleteMedicationModal(true))
        //     }
        // },
    ];

    const DROPDOWN_BUTTON_ACTION = [
        {
            title: 'Add Medication',
            onClickCb: () => navigate(`/${EPISODE_MANAGEMENT.EPISODE_MANAGEMENT}/${EPISODE_MANAGEMENT.CHILD_ROUTS.ADD_NEW_MEDICATION}/${episodeId}`)
        },
        // {
        //     title: 'Add Custom Medication',
        //     onClickCb: () => { }
        // }
    ];

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
        },
        {
            field: 'more',
            header: <Label weight={LABEL_WEIGHT[700]}>More</Label>,
            renderLogic: (row, idx) => <UncontrolledDropdownV2 data={{ row, idx }} action={ACTION_BUTTONS} />
        }
    ];
    return (
        <React.Fragment>
            {/* <div className='mb-3 d-flex justify-content-between'>
                <div></div>
                <ButtonDropdown
                    buttonTitle="Add Medication"
                    actions={DROPDOWN_BUTTON_ACTION}
                    variant={BUTTON_TYPE.PRIMARY}
                    icon={VEC_ICON_NAME.ARROW_DOWN_ICON_SIDEBAR}
                />
            </div> */}

            <RichGrid
                data={medications}
                columns={TASK_DETAILS_COLUMNS}
                extractRowKey={(row) => row.phoneNumber}
                selectable={false}
                selectedRows={selectedMedications}
                onSelectionChangeCallBack={(selectedData) => dispatch(setSelectedMedications(selectedData))}
                onHeaderSelectionChangeCallBack={(selectedData) => dispatch(setSelectedMedications(selectedData))}
                paginationProps={{
                    page: MedicationPaginationState.PageNumber,
                    take: MedicationPaginationState.PageSize,
                    total: MedicationPaginationState.totalPatients,
                    onChangeTakeCb: (newTake) => {
                        dispatch(setMedicationPaginationState({ ...MedicationPaginationState, PageNumber: 1, PageSize: newTake }))
                        dispatch(getAllMedications({ agencyId, episodeId, token, PageNumber: 1, limit: newTake }));
                    },
                    onChange: (page) => {
                        dispatch(setMedicationPaginationState({ PageNumber: page }))
                        dispatch(getAllMedications({ agencyId, episodeId, token, PageNumber: page, limit: MedicationPaginationState.PageSize }));
                    },
                }}
            />

            <ConfirmationModal
                isOpen={showDeleteMedicationModal}
                toggle={() => dispatch(setShowDeleteMedicationModal(!showDeleteMedicationModal))}
                header='Are you sure?'
                bodyContent='Would you really like to remove this medication?'
                successButtonText="Delete"
                closeButtonText="Close"
                onSuccessCb={() => {
                    dispatch(deleteMedication({ agencyId, medicationId: selectedMedicationToDelete.id, token, episodeId, MedicationPaginationState }))
                }}
            />

        </React.Fragment>
    );
};
export default Medications;
