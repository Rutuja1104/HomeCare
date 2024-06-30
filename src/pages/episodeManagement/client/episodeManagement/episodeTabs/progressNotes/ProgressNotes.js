import React, { useEffect } from 'react'

import { useDispatch, useSelector } from 'react-redux'
import { LABEL_WEIGHT } from '../../../../../../components/label/labelV2/constants'
import { componentKey, setSelectedProgressNotes, setProgressNotesPaginationState, setSelectedProgressNote, setShowDeleteProgressNoteModal } from '../../ClientEpisodeManagementSlice'
import { deleteProgressNote, getProgressNotesByEpisodeId } from '../../ClientEpisodeManagementSaga'
import { useNavigate, useParams } from 'react-router-dom'
import { BUTTON_TYPE } from '../../../../../../libs/constant'
import { VEC_ICON_NAME } from '../../../../../../components/icon/constants'
import { CLIENT_EPISODE_MANAGEMENT, EPISODE_MANAGEMENT } from '../../../../../../routes/constants'

import RichGrid from '../../../../../../components/richgrid/RichGrid'
import Label from '../../../../../../components/label/labelV2/Label'
import BadgeV2 from '../../../../../../components/badge/BadgeV2'
import General from '../../../../../../libs/utility/General'
import UncontrolledDropdownV2 from '../../../../../../components/uncontrolledDropdown/UncontrolledDropdown'
import ButtonDropdown from '../../../../../../components/buttonDropdown/ButtonDropdown'
import SelectDropdown from '../../../../../../components/select/Select'
import moment from 'moment'
import ConfirmationModal from '../../../../../../components/models/ConfirmationModal'

const ProgressNotes = () => {

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const { episodeId } = useParams()
    const agencyId = General.getLocalStorageData("agencyId")
    const token = General.getLocalStorageData("token")

    const { ProgressNotesPaginationState, selectedProgressNotes, ProgressNotesList, selectedProgressNote, showDeleteProgressNoteModal } = useSelector(state => state[componentKey])

    useEffect(() => {
        if (episodeId) {
            dispatch(getProgressNotesByEpisodeId({ agencyId, episodeId, status: ProgressNotesPaginationState.Status.value, limit: ProgressNotesPaginationState.PageSize, pageNumber: ProgressNotesPaginationState.PageNumber, token }))
        }
    }, [agencyId, episodeId])

    const ACTION_BUTTONS = [
        {
            text: "Delete Note",
            onClickCb: (row) => {
                dispatch(setSelectedProgressNote(row))
                dispatch(setShowDeleteProgressNoteModal(true))
            }
        },
        {
            text: "View/Edit",
            onClickCb: (row) => {
                navigate(`/${CLIENT_EPISODE_MANAGEMENT.EPISODE_MANAGEMENT}/${EPISODE_MANAGEMENT.CHILD_ROUTS.ADD_PROGRESS_NOTES}/${episodeId}?pi=${row.id}`)
            }
        },
    ];

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
        },
        {
            field: "userName",
            header: <Label weight={LABEL_WEIGHT[700]}>More</Label>,
            renderLogic: (row, idx) => <UncontrolledDropdownV2 data={{ row, idx }} action={ACTION_BUTTONS} />
        },
    ]

    const DROPDOWN_BUTTON_ACTION = [
        {
            title: "Add New Note",
            onClickCb: () => navigate(`/${CLIENT_EPISODE_MANAGEMENT.EPISODE_MANAGEMENT}/${CLIENT_EPISODE_MANAGEMENT.CHILD_ROUTS.ADD_PROGRESS_NOTES}/${episodeId}`)
        }
    ]
    return (
        <React.Fragment>
            <div className='mb-2 d-flex justify-content-between'>
                <SelectDropdown
                    type="text"
                    placeHolder="Search by task status"
                    name="role"
                    onChangeCb={(event) => {
                        dispatch(setProgressNotesPaginationState({ Status: event.target.selectedOption }))
                        dispatch(setProgressNotesPaginationState({ PageNumber: 1 }))
                        // dispatch(setProgressNotesPaginationState({ PageNumber: 1 }))
                        dispatch(getProgressNotesByEpisodeId({ agencyId, episodeId, status: event.target.selectedOption.value, limit: ProgressNotesPaginationState.PageSize, pageNumber: ProgressNotesPaginationState.PageNumber, token }))
                    }}
                    defaultValue={ProgressNotesPaginationState.Status}
                    options={[
                        { label: "Open", value: "Open" },
                        { label: "In Progress", value: "InProgress" },
                        { label: "Closed", value: "Closed" },
                        { label: "Complete", value: "Complete" },
                        { label: "Approved", value: "Approved" },
                        { label: "Rejected", value: "Rejected" },
                    ]}
                />
                <ButtonDropdown
                    buttonTitle="Add a Note"
                    actions={DROPDOWN_BUTTON_ACTION}
                    variant={BUTTON_TYPE.PRIMARY}
                    className='ms-3'
                    icon={VEC_ICON_NAME.ARROW_DOWN_ICON_SIDEBAR}
                />
            </div>

            <RichGrid
                data={ProgressNotesList}
                columns={TASK_DETAILS_COLUMNS}
                extractRowKey={(row) => row.phoneNumber}
                selectable={false}
                selectedRows={selectedProgressNotes}
                onSelectionChangeCallBack={(selectedData) => dispatch(setSelectedProgressNotes(selectedData))}
                onHeaderSelectionChangeCallBack={(selectedData) => dispatch(setSelectedProgressNotes(selectedData))}
                paginationProps={{
                    page: ProgressNotesPaginationState.PageNumber,
                    take: ProgressNotesPaginationState.PageSize,
                    total: ProgressNotesPaginationState.totalPatients,
                    onChangeTakeCb: (newTake) => {
                        dispatch(setProgressNotesPaginationState({ ...ProgressNotesPaginationState, PageNumber: 1, PageSize: newTake }))
                        dispatch(getProgressNotesByEpisodeId({ agencyId, episodeId, status: ProgressNotesPaginationState.Status.value, limit: newTake, pageNumber: 1, token }))
                    },
                    onChange: (page) => {
                        dispatch(setProgressNotesPaginationState({ PageNumber: page }))
                        dispatch(getProgressNotesByEpisodeId({ agencyId, episodeId, status: ProgressNotesPaginationState.Status.value, limit: ProgressNotesPaginationState.PageSize, pageNumber: page, token }))
                    },
                }}
            />

            <ConfirmationModal
                isOpen={showDeleteProgressNoteModal}
                toggle={() => dispatch(setShowDeleteProgressNoteModal(!showDeleteProgressNoteModal))}
                header='Are you sure?'
                bodyContent='Would you really like to delete this progress note?'
                successButtonText="Delete"
                closeButtonText="Close"
                onSuccessCb={() => {
                    dispatch(deleteProgressNote({ agencyId, episodeId, noteId: selectedProgressNote.id, ProgressNotesPaginationState, token }))
                }}
            />
        </React.Fragment>
    )
}

export default ProgressNotes
