import React, { useEffect } from 'react'

import { useDispatch, useSelector } from 'react-redux'
import { LABEL_WEIGHT } from '../../../../../../components/label/labelV2/constants'
import { componentKey, setSelectedTask, setSelectedTasks, setShowDeleteTaskModal, setTaskListPaginationState } from '../../ClientEpisodeManagementSlice'
import { deleteTaskAndSchedule, getTaskListByEpisodeId } from '../../ClientEpisodeManagementSaga'
import { useNavigate, useParams } from 'react-router-dom'
import { BUTTON_TYPE } from '../../../../../../libs/constant'
import { CLIENT_EPISODE_MANAGEMENT } from '../../../../../../routes/constants'

import RichGrid from '../../../../../../components/richgrid/RichGrid'
import Label from '../../../../../../components/label/labelV2/Label'
import BadgeV2 from '../../../../../../components/badge/BadgeV2'
import General from '../../../../../../libs/utility/General'
import UncontrolledDropdownV2 from '../../../../../../components/uncontrolledDropdown/UncontrolledDropdown'
import SelectDropdown from '../../../../../../components/select/Select'
import ConfirmationModal from '../../../../../../components/models/ConfirmationModal'
import Button from '../../../../../../components/button/Button'

const TaskList = () => {

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const { episodeId } = useParams()
    const agencyId = General.getLocalStorageData("agencyId")
    const token = General.getLocalStorageData("token")

    const { TaskListPaginationState, selectedTasks, taskList, showDeleteTaskModal, selectedTask } = useSelector(state => state[componentKey])

    useEffect(() => {
        if (episodeId) {
            dispatch(getTaskListByEpisodeId({ agencyId, episodeId, status: TaskListPaginationState.Status.value, limit: TaskListPaginationState.PageSize, pageNumber: TaskListPaginationState.PageNumber, token }))
        }
    }, [agencyId, episodeId])

    const ACTION_BUTTONS = [
        {
            text: "View/Edit",
            onClickCb: (row) => {
                navigate(`/${CLIENT_EPISODE_MANAGEMENT.EPISODE_MANAGEMENT}/${CLIENT_EPISODE_MANAGEMENT.CHILD_ROUTS.CREATE_TASK}/${episodeId}?ti=${row.id}&ie=true`)
            }
        },
        {
            text: "Delete Task",
            onClickCb: (row) => {
                dispatch(setSelectedTask(row))
                dispatch(setShowDeleteTaskModal(true))
            }
        },
    ];

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
        },
        {
            field: "userName",
            header: <Label weight={LABEL_WEIGHT[700]}>More</Label>,
            renderLogic: (row, idx) => <UncontrolledDropdownV2 data={{ row, idx }} action={ACTION_BUTTONS} />
        },
    ]

    return (
        <React.Fragment>
            <div className='mb-2 d-flex justify-content-between'>
                <SelectDropdown
                    type="text"
                    placeHolder="Search by task status"
                    name="role"
                    onChangeCb={(event) => {
                        dispatch(setTaskListPaginationState({ Status: event.target.selectedOption }))
                        dispatch(getTaskListByEpisodeId({ agencyId, episodeId, status: event.target.selectedOption.value, limit: TaskListPaginationState.PageSize, pageNumber: TaskListPaginationState.PageNumber, token }))
                    }}
                    defaultValue={TaskListPaginationState.Status}
                    options={[
                        { label: "Open", value: "Open" },
                        { label: "In Progress", value: "InProgress" },
                        { label: "Closed", value: "Closed" },
                        { label: "Complete", value: "Complete" },
                        { label: "Approved", value: "Approved" },
                        { label: "Rejected", value: "Rejected" },
                    ]}
                />
                <Button styles={{ whiteSpace: 'nowrap', marginLeft: "20px" }} variant={BUTTON_TYPE.PRIMARY} onClickCb={() => navigate(`/${CLIENT_EPISODE_MANAGEMENT.EPISODE_MANAGEMENT}/${CLIENT_EPISODE_MANAGEMENT.CHILD_ROUTS.CREATE_TASK}/${episodeId}`)}>Add Task</Button>
            </div>

            <RichGrid
                data={taskList}
                columns={TASK_DETAILS_COLUMNS}
                extractRowKey={(row) => row.phoneNumber}
                selectable={false}
                selectedRows={selectedTasks}
                onSelectionChangeCallBack={(selectedData) => dispatch(setSelectedTasks(selectedData))}
                onHeaderSelectionChangeCallBack={(selectedData) => dispatch(setSelectedTasks(selectedData))}
                paginationProps={{
                    page: TaskListPaginationState.PageNumber,
                    take: TaskListPaginationState.PageSize,
                    total: TaskListPaginationState.totalPatients,
                    onChangeTakeCb: (newTake) => {
                        dispatch(setTaskListPaginationState({ ...TaskListPaginationState, PageNumber: 1, PageSize: newTake }))
                        dispatch(getTaskListByEpisodeId({ agencyId, episodeId, status: TaskListPaginationState.Status.value, limit: newTake, pageNumber: 1, token }))
                    },
                    onChange: (page) => {
                        dispatch(setTaskListPaginationState({ PageNumber: page }))
                        dispatch(getTaskListByEpisodeId({ agencyId, episodeId, status: TaskListPaginationState.Status.value, limit: TaskListPaginationState.PageSize, pageNumber: page, token }))
                    },
                }}
            />

            <ConfirmationModal
                isOpen={showDeleteTaskModal}
                toggle={() => dispatch(setShowDeleteTaskModal(!showDeleteTaskModal))}
                header='Are you sure?'
                bodyContent='Would you really like to remove this task? Additionally, the schedule that was made with this task will be removed.'
                successButtonText="Delete"
                closeButtonText="Close"
                onSuccessCb={() => {
                    dispatch(deleteTaskAndSchedule({ agencyId, episodeId, taskId: selectedTask.id, TaskListPaginationState, token }))
                }}
            />

        </React.Fragment>
    )
}

export default TaskList
