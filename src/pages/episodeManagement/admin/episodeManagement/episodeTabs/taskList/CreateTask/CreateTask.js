import React, { useEffect } from 'react'
import { toast } from 'react-toastify'

import { setHeaderLabel } from '../../../../../../../layouts/LayoutSlice'
import { useDispatch, useSelector } from 'react-redux'
import { componentKey } from '../../../../EpisodeManagementSlice'
import { BUTTON_TYPE } from '../../../../../../../libs/constant'
import { useLocation, useNavigate, useParams, useSearchParams } from 'react-router-dom'
import { EPISODE_MANAGEMENT } from '../../../../../../../routes/constants'
import { deleteSchedule, getAssigneeByDisciplineAndRole, getEpisodeDetailsById, getSchedulesByEpisode, getTaskByTaskId, getTaskTypeByDiscipline, patchUpdateExistingTasks, postCreateTask, updateScheduleById } from '../../../AdminEpisodeManagementSaga'
import { componentKey as adminEpisodeManagementComponentKey, setAddFrequencyDateByOptions, setAddNewCustomTaskDate, setAddNewScheduleInExistingSchedules, setAddNewTaskForWeek, setAllRequiredFieldsTouched, setClearFrequencyDateByOptions, setClearRemoveTaskStates, setClearTaskState, setCreateTaskStates, setCustomTaskDates, setDeleteSelectedSchedule, setExistingTaskSchedule, setIsNavigateToTaskList, setReflectScheduleCheckBox, setReflectScheduleModal, setRemoveCustomTaskDate, setRemoveSchedule, setRemoveTaskForWeek, setSelectedIndexOfSchedule, setSelectedScheduleData, setSelectedTaskTypes, setShowDeleteScheduleModal, setShowRemoveExistingScheduleModal, setShowUpdateScheduleModal, setShowViewAvailabilityModal, setTaskDetailsById, setTaskForWeeksFieldsTouch, setTaskForWeeksState, setUpdatedCreateTaskStates, setUpdatedExistingSchedules } from "../../../AdminEpisodeManagementSlice"
import { EPISODE_STATUS } from '../../../../constants'
import { HEADING } from '../../../../../../../components/heading/constants/constants'
import { VEC_ICON_NAME } from '../../../../../../../components/icon/constants'
import { CREATE_TASK_STATES, CUSTOM_TASK_DATE, TASK_FREQUENCY_OPTIONS, WEEKS_INFORMATION } from '../../../constants'
import { componentKey as dataLoaderComponentKey } from "../../../../../../../components/loaders/dataloader/DataLoaderSlice"
import GeneralValidator, { generalValidator } from '../../../../../../../libs/utility/validators/GeneralValidator'

import Loadable from '../../../../../../../components/loadable/Loadable'
import Container from '../../../../../../../components/container/Container'
import SelectDropdown from '../../../../../../../components/select/Select'
import ResponsiveBox from '../../../../../../../components/responsivebox/ResponsiveBox'
import DatePicker from '../../../../../../../components/datePicker/DatePicker'
import TextArea from '../../../../../../../components/input/textarea/TextArea'
import Heading from '../../../../../../../components/heading/Heading'
import RadioInput from '../../../../../../../components/input/radioinput/RadioInput'
import Button from '../../../../../../../components/button/Button'
import TextInput from '../../../../../../../components/input/textinput/TextInput'
import moment from 'moment'
import General from '../../../../../../../libs/utility/General'
import CheckboxWLabel from '../../../../../../../components/checkbox/checkboxwlabel/CheckboxWLabel'
import ConfirmationModal from '../../../../../../../components/models/ConfirmationModal'
import ViewAvailabilityModal from '../../../../../../../components/models/ViewAvailabilityModal'
import Icons from '../../../../../../../components/icon/Icon'

const CreateTask = () => {

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [searchParams] = useSearchParams();

    const type = searchParams.get('type');

    const taskId = searchParams.get('ti');

    const token = General.getLocalStorageData("token")
    const agencyId = General.getLocalStorageData("agencyId")

    const location = useLocation()

    const { episodeId } = useParams()

    const { taskTypeList, assigneeByRoleList, createTaskStates, allRequiredFieldsTouched, taskForWeeks, taskForWeeksFieldsTouch, customTaskDate, episodeDetailsForCreatePage, selectedTaskTypes, isNavigateToTaskList, reflectScheduleCheckBox, reflectScheduleModal, showViewAvailabilityModal, scheduleTaskList, taskDetailsById, existingTaskSchedule, showRemoveExistingScheduleModal, selectedIndexOfSchedule, ShowDeleteScheduleModal, selectedScheduleData, showUpdateScheduleModal } = useSelector(state => state[adminEpisodeManagementComponentKey])
    const { loadingState } = useSelector(state => state[componentKey])
    const { professionalRoles } = useSelector(state => state[dataLoaderComponentKey])

    useEffect(() => {
        dispatch(setUpdatedCreateTaskStates(CREATE_TASK_STATES))
    }, [location.path])

    useEffect(() => {
        if (taskId) {
            dispatch(getTaskByTaskId({ taskId, token }))
        }
    }, [taskId])


    useEffect(() => {
        if (taskDetailsById?.Staff?.role || taskDetailsById?.Nurse?.role) {
            dispatch(getTaskTypeByDiscipline({ type: taskDetailsById?.Nurse?.role, token }))
            dispatch(getAssigneeByDisciplineAndRole({ role: taskDetailsById?.Nurse?.role, discipline: "other", token }))

            const copiedCreateTaskStates = JSON.parse(JSON.stringify(createTaskStates))

            copiedCreateTaskStates.employeeName.value = taskDetailsById.assigneeName
            copiedCreateTaskStates.TaskName.value = taskDetailsById.taskName
            copiedCreateTaskStates.TaskStatus.value = taskDetailsById.status
            copiedCreateTaskStates.Comments.value = taskDetailsById.comment
            copiedCreateTaskStates.Discipline.value = taskDetailsById.taskType
            dispatch(setUpdatedCreateTaskStates(copiedCreateTaskStates))

            let filteredData = [];

            taskDetailsById.TaskSchedules.forEach(entry => {
                const week = entry.week;
                const existingWeekData = filteredData.find(data => data.week === week);

                if (!existingWeekData) {

                    const obj = {
                        inTime: { value: entry?.inTime, errors: {}, rules: { required: true } },
                        outTime: { value: entry?.outTime, errors: {}, rules: { required: true } },
                        date: { value: entry?.date, errors: {}, rules: { required: true } },
                        id: { value: entry?.id, errors: {}, rules: { required: true } },
                    }

                    const newWeekData = {
                        week: week,
                        dateAndTime: [obj],
                    };
                    filteredData.push(newWeekData);
                } else {
                    const obj = {
                        inTime: { value: entry?.inTime, errors: {}, rules: { required: true } },
                        outTime: { value: entry?.outTime, errors: {}, rules: { required: true } },
                        date: { value: entry?.date, errors: {}, rules: { required: true } },
                        id: { value: entry?.id, errors: {}, rules: { required: true } },
                    }

                    existingWeekData.dateAndTime.push(obj);
                }
            });

            const sortedData = filteredData.sort((a, b) => {
                const weekA = a.week.substring(4);
                const weekB = b.week.substring(4);

                return parseInt(weekA, 10) - parseInt(weekB, 10);
            });

            dispatch(setExistingTaskSchedule(sortedData))
            dispatch(setSelectedTaskTypes({ name: "employeeName", value: { firstName: taskDetailsById.assigneeName.split(" ")[0], lastName: taskDetailsById.assigneeName.split(" ")[1], id: taskDetailsById.taskType == "Oasis" ? taskDetailsById.staffId : taskDetailsById.nurseId } }))

            const obj = {
                agencyId,
                nurseId: taskDetailsById.nurseId,
                token
            }

            dispatch(getSchedulesByEpisode(obj))
        }
    }, [taskDetailsById?.Staff?.role, taskDetailsById?.Nurse?.role, taskDetailsById])

    useEffect(() => {
        dispatch(setHeaderLabel(`${taskId ? "Update" : "Create"}  Task`))
        dispatch(getEpisodeDetailsById({ agencyId, episodeId, token, isForOtherUse: true }))
    }, [])

    useEffect(() => {
        if (episodeDetailsForCreatePage) {
            dispatch(setCreateTaskStates({ ScheduleDate: { value: episodeDetailsForCreatePage.startTime } }));
        }
    }, [episodeDetailsForCreatePage])

    useEffect(() => {
        if (isNavigateToTaskList) {
            dispatch(setUpdatedCreateTaskStates(CREATE_TASK_STATES))
            navigate(`/${EPISODE_MANAGEMENT.EPISODE_MANAGEMENT}/${EPISODE_MANAGEMENT.CHILD_ROUTS.EPISODE_DETAILS}/${episodeId}?at=2`)
            dispatch(setIsNavigateToTaskList(false))
            dispatch(setTaskDetailsById({}))
        }
    }, [isNavigateToTaskList])

    const onChangeHandler = (event, rules) => {
        const { name, value, selectedOption } = event.target;

        if (name == "employeeName" || name == "TaskName" || name == "TaskStatus") {
            dispatch(setSelectedTaskTypes({ name, value: selectedOption }))
        }

        if (name == "Discipline") {
            dispatch(getTaskTypeByDiscipline({ type: selectedOption.code, token }))
            dispatch(getAssigneeByDisciplineAndRole({ role: selectedOption.code, token }))
            dispatch(setCreateTaskStates({ "TaskName": { value: "" } }));
            dispatch(setCreateTaskStates({ "employeeName": { value: "" } }));
        }

        if (name == "employeeName") {
            const obj = {
                agencyId,
                ...(type == "staff" ? { staffId: selectedOption.id } : { nurseId: selectedOption.id }),
                token
            }

            dispatch(getSchedulesByEpisode(obj))
        }

        if (rules) {
            const errors = generalValidator.validate(value, rules);
            dispatch(setCreateTaskStates({ [name]: { value, errors, rules } }));
        } else {
            dispatch(setCreateTaskStates({ [name]: { value } }));
        }
    };

    const onChangeCustomDateHandler = (event, rules, index) => {
        const { name, value } = event.target;

        if (rules) {
            const errors = generalValidator.validate(value, rules);
            dispatch(setCustomTaskDates({ object: { [name]: { value, errors, rules } }, index }));
        } else {
            dispatch(setCustomTaskDates({ object: { [name]: { value } }, index }));
        }
    };

    const onChangeTaskFrequencyHandler = (event, rules, parentIndex, childIndex) => {
        const { name, value, selectedOption } = event.target;

        if (name === "SelectFrequency") {
            dispatch(setTaskForWeeksFieldsTouch(false))
            dispatch(setClearFrequencyDateByOptions({ index: parentIndex }))
            for (let i = 0; i < Number(selectedOption.value); i++) {
                dispatch(setAddFrequencyDateByOptions({ data: CUSTOM_TASK_DATE, index: parentIndex }))
            }
        }

        if (rules) {
            const errors = generalValidator.validate(value, rules);
            dispatch(setTaskForWeeksState({ object: { [name]: { value, errors, rules } }, parentIndex, childIndex, name }));
        } else {
            dispatch(setTaskForWeeksState({ object: { [name]: { value } }, parentIndex, childIndex, name }));
        }
    }

    const onChangeExistingSchedule = (event, rules, parentIndex, childIndex) => {
        const { name, value } = event.target;

        if (rules) {
            const errors = generalValidator.validate(value, rules);
            dispatch(setUpdatedExistingSchedules({ object: { [name]: { value, errors, rules } }, parentIndex, childIndex }));
        } else {
            dispatch(setUpdatedExistingSchedules({ object: { [name]: { value } }, parentIndex, childIndex }));
        }
    }

    const calculateEpisodeWeeks = (startDate, endDate) => {
        const sDate = moment(startDate);
        const eDate = moment(endDate);

        let weeksDifference = eDate.diff(sDate, 'weeks');

        const fractionalPart = eDate.diff(sDate, 'days') % 7;

        if (fractionalPart > 0) {
            weeksDifference += 1;
        }

        return weeksDifference;
    };

    function getWeekDates(startDate, endDate, weekNumber) {
        const startOfWeek = moment(startDate).add((weekNumber - 1) * 7, 'days');

        const endOfWeek = startOfWeek.clone().add(6, 'days');

        const adjustedEndOfWeek = endOfWeek.isBefore(moment(endDate)) ? endOfWeek : moment(endDate);

        return {
            startDate: startOfWeek.format('YYYY-MM-DD'),
            endDate: adjustedEndOfWeek.format('YYYY-MM-DD')
        };
    }

    const handleCreateTaskClick = () => {
        dispatch(setAllRequiredFieldsTouched(true))
        dispatch(setTaskForWeeksFieldsTouch(true))

        if (taskId) {
            if (createTaskStates.frequencyChanged.value.length === 0) {
                toast.error("Please select one of the following option!")
                return
            }

            if (createTaskStates.frequencyChanged.value === "Yes") {
                if (!GeneralValidator.validateRequiredFields({ ...createTaskStates, ...{ frequency: { ...createTaskStates, rules: { required: false } } } }) && !GeneralValidator.validateRequiredFieldsArrayOfArray(taskForWeeks)) {
                    let obj = []

                    taskForWeeks.map((item) => {
                        item.dateAndTime.map(item => {
                            let dataTime = {
                                "status": "Open",
                                "day": moment(item.scheduledDate.value).format('dddd'),
                                "date": moment(item.scheduledDate.value).format("MM-DD-YYYY"),
                                "inTime": item.StartTime.value,
                                "outTime": item.EndTime.value
                            }
                            obj.push(dataTime)
                        })
                    })

                    const data = {
                        "status": createTaskStates.TaskStatus.value,
                        "assigneeName": `${selectedTaskTypes.employeeName.firstName} ${selectedTaskTypes.employeeName.lastName}`,
                        "comment": createTaskStates.Comments.value,
                        "taskName": createTaskStates.TaskName.value,
                        "nurseId": selectedTaskTypes.employeeName.id,
                        "isFrequencyChanged": createTaskStates.frequencyChanged.value === "Yes" ? true : false,
                        "taskSchedules": obj,
                        "frequencyType": createTaskStates.frequencyChanged.value === "Yes" ? taskForWeeks[0]?.SelectFrequency?.value : "false" || "false"
                    }

                    dispatch(patchUpdateExistingTasks({ agencyId, episodeId, taskId, data, token }))
                }
            } else {
                if (!GeneralValidator.validateRequiredFields({ ...createTaskStates, ...{ frequency: { ...createTaskStates, rules: { required: false } } } }) && !GeneralValidator.validateRequiredFieldsArray(existingTaskSchedule)) {

                    let obj = []

                    existingTaskSchedule.map((_) => {
                        _.dateAndTime.map(item => {
                            let dataTime = {
                                "status": "Open",
                                "day": moment(item.date.value).format('dddd'),
                                "week": _.week,
                                "date": moment(item.date.value).format("MM-DD-YYYY"),
                                "inTime": item.inTime.value,
                                "outTime": item.outTime.value,
                                "id": item.id.value
                            }
                            obj.push(dataTime)
                        })
                    })


                    const data = {
                        "status": createTaskStates.TaskStatus.value,
                        "assigneeName": `${selectedTaskTypes.employeeName.firstName} ${selectedTaskTypes.employeeName.lastName}`,
                        "comment": createTaskStates.Comments.value,
                        "taskName": createTaskStates.TaskName.value,
                        "nurseId": selectedTaskTypes.employeeName.id,
                        "isFrequencyChanged": createTaskStates.frequencyChanged.value === "Yes" ? true : false,
                        "taskSchedules": obj,
                        "frequencyType": "false"
                    }

                    dispatch(patchUpdateExistingTasks({ agencyId, episodeId, taskId, data, token }))
                }
            }
        } else {
            if (createTaskStates.frequency.value.length === 0) {
                toast.error("Please select one of the following option!")
                return
            }

            if (createTaskStates.frequency.value === "Yes") {
                if (!GeneralValidator.validateRequiredFields(createTaskStates) && !GeneralValidator.validateRequiredFieldsArrayOfArray(taskForWeeks)) {
                    let obj = []

                    taskForWeeks.map((item) => {
                        item.dateAndTime.map(item => {
                            let dataTime = {
                                "status": "Open",
                                "day": moment(item.scheduledDate.value).format('dddd'),
                                "date": moment(item.scheduledDate.value).format("MM-DD-YYYY"),
                                "inTime": item.StartTime.value,
                                "outTime": item.EndTime.value
                            }
                            obj.push(dataTime)
                        })
                    })

                    const data = {
                        "taskType": createTaskStates.Discipline.value,
                        "assigneeName": `${selectedTaskTypes.employeeName.firstName} ${selectedTaskTypes.employeeName.lastName}`,
                        "status": createTaskStates.TaskStatus.value,
                        "scheduleDate": episodeDetailsForCreatePage.startTime,
                        "comment": createTaskStates.Comments.value,
                        "isSetFrequency": reflectScheduleCheckBox ? true : false,
                        "nurseId": selectedTaskTypes.employeeName.id,
                        "taskSchedules": obj,
                        "created_by": General.tokenDecode(token).id,
                        "taskName": createTaskStates.TaskName.value,
                        "frequencyType": reflectScheduleCheckBox ? taskForWeeks[0]?.SelectFrequency?.value : "false" || "false"
                    }

                    dispatch(postCreateTask({ agencyId, episodeId, data, token }))
                }
            } else {
                if (!GeneralValidator.validateRequiredFields(createTaskStates) && !GeneralValidator.validateRequiredFieldsArray(customTaskDate)) {
                    let dateObj = customTaskDate.map(item => ({
                        "status": "Open",
                        "day": moment(item.scheduledDate.value).format('dddd'),
                        "week": `Week1`,
                        "date": moment(item.scheduledDate.value).format("MM-DD-YYYY"),
                        "inTime": item.StartTime.value,
                        "outTime": item.EndTime.value
                    }))

                    const data = {
                        "taskType": createTaskStates.Discipline.value,
                        "assigneeName": `${selectedTaskTypes.employeeName.firstName} ${selectedTaskTypes.employeeName.lastName}`,
                        "status": createTaskStates.TaskStatus.value,
                        "scheduleDate": episodeDetailsForCreatePage.startTime,
                        "comment": createTaskStates.Comments.value,
                        "isSetFrequency": reflectScheduleCheckBox ? true : false,
                        "nurseId": selectedTaskTypes.employeeName.id,
                        "taskSchedules": dateObj,
                        "created_by": General.tokenDecode(token).id,
                        "taskName": createTaskStates.TaskName.value,
                        "frequencyType": reflectScheduleCheckBox ? taskForWeeks[0]?.SelectFrequency?.value : "false" || "false"
                    }

                    dispatch(postCreateTask({ agencyId, episodeId, data, token }))
                }
            }
        }
    }

    const handleReflectScheduleClick = (e) => {
        dispatch(setReflectScheduleCheckBox(e.target.checked))

        if (e.target.checked) {
            dispatch(setReflectScheduleModal(true))
        }
    }

    const handleViewAvailabilityClick = () => {

        if (createTaskStates.employeeName.value) {
            dispatch(setShowViewAvailabilityModal(true))
        } else {
            toast.error("Please select employee name (Assigned to)")
        }
    }

    return (
        <Loadable loadingStates={loadingState.state} loadingMessage={loadingState.message}>
            <Container header={`${taskId ? "Update" : "Add"} Task`}>
                <ResponsiveBox size={1000}>
                    <SelectDropdown
                        name="Discipline"
                        label="Select Discipline"
                        placeHolder="Please select discipline"
                        options={professionalRoles}
                        onChangeCb={onChangeHandler}
                        value={createTaskStates.Discipline.value}
                        rules={createTaskStates.Discipline.rules}
                        errors={createTaskStates.Discipline.errors}
                        formSubmitted={allRequiredFieldsTouched}
                        defaultValue={createTaskStates?.Discipline?.value?.length !== 0 ? { label: createTaskStates.Discipline.value } : null}
                    />
                    <SelectDropdown
                        name="TaskName"
                        label="Task Type"
                        placeHolder="Please select task type"
                        options={taskTypeList}
                        onChangeCb={onChangeHandler}
                        value={createTaskStates.TaskName.value}
                        rules={createTaskStates.TaskName.rules}
                        errors={createTaskStates.TaskName.errors}
                        formSubmitted={allRequiredFieldsTouched}
                        defaultValue={createTaskStates.TaskName.value.length !== 0 ? { label: createTaskStates.TaskName.value } : null}
                    />
                    <SelectDropdown
                        name="employeeName"
                        label="Employee Name (Assigned to)"
                        placeHolder="Please select employee name"
                        options={assigneeByRoleList}
                        onChangeCb={onChangeHandler}
                        value={createTaskStates.employeeName.value}
                        rules={createTaskStates.employeeName.rules}
                        errors={createTaskStates.employeeName.errors}
                        formSubmitted={allRequiredFieldsTouched}
                        defaultValue={createTaskStates.employeeName.value.length !== 0 ? { label: createTaskStates.employeeName.value } : null}
                    />
                </ResponsiveBox>
                <ResponsiveBox size={700}>
                    <DatePicker
                        type="text"
                        name="ScheduleDate"
                        label="SOC Date"
                        onChangeCb={onChangeHandler}
                        value={createTaskStates.ScheduleDate.value}
                        rules={createTaskStates.ScheduleDate.rules}
                        errors={createTaskStates.ScheduleDate.errors}
                        formSubmitted={allRequiredFieldsTouched}
                        disabled={true}
                    />
                    <SelectDropdown
                        name="TaskStatus"
                        label="Task Status"
                        placeHolder="Please select task status"
                        options={EPISODE_STATUS}
                        onChangeCb={onChangeHandler}
                        value={createTaskStates.TaskStatus.value}
                        rules={createTaskStates.TaskStatus.rules}
                        errors={createTaskStates.TaskStatus.errors}
                        formSubmitted={allRequiredFieldsTouched}
                        defaultValue={createTaskStates.TaskStatus.value.length !== 0 ? { label: createTaskStates.TaskStatus.value } : null}
                        disabled={!taskId ? true : false}
                    />
                </ResponsiveBox>

                <TextArea
                    label="Comments"
                    name='Comments'
                    onChangeCb={onChangeHandler}
                    value={createTaskStates.Comments.value}
                    rules={createTaskStates.Comments.rules}
                    errors={createTaskStates.Comments.errors}
                    formSubmitted={allRequiredFieldsTouched}
                />

                {taskId ?
                    <>
                        <div className='d-flex'>
                            <Heading type={HEADING.H3}>Do you want to change existing frequency?</Heading>
                            <Heading onClickCb={handleViewAvailabilityClick} type={HEADING.H3} customStyle={{ marginLeft: "10px", color: "#087d9e", cursor: "pointer" }}>View Availability</Heading>
                        </div>

                        <RadioInput
                            label={{ suffixLabel: 'Yes' }}
                            name={'frequencyChanged'}
                            onChangeCb={onChangeHandler}
                            value='Yes'
                            checked={createTaskStates.frequencyChanged.value === "Yes" ? true : false}
                        />
                        <RadioInput
                            label={{ suffixLabel: 'No' }}
                            name={'frequencyChanged'}
                            value='No'
                            onChangeCb={onChangeHandler}
                            checked={createTaskStates.frequencyChanged.value === "No" ? true : false}
                        />
                    </>
                    :
                    <>
                        <div className='d-flex'>
                            <Heading type={HEADING.H3}>Do you want to set frequency?</Heading>
                            <Heading onClickCb={handleViewAvailabilityClick} type={HEADING.H3} customStyle={{ marginLeft: "10px", color: "#087d9e", cursor: "pointer" }}>View Availability</Heading>
                        </div>

                        <RadioInput
                            label={{ suffixLabel: 'Yes' }}
                            name={'frequency'}
                            onChangeCb={onChangeHandler}
                            value='Yes'
                            checked={createTaskStates.frequency.value === "Yes" ? true : false}
                        />
                        <RadioInput
                            label={{ suffixLabel: 'No' }}
                            name={'frequency'}
                            value='No'
                            onChangeCb={onChangeHandler}
                            checked={createTaskStates.frequency.value === "No" ? true : false}
                        />
                    </>
                }

                <div className='mt-4'>
                    {(createTaskStates.frequency.value === "Yes" || createTaskStates.frequencyChanged.value === "Yes") &&
                        <>
                            {taskForWeeks.map((item, index) => {
                                return (
                                    <React.Fragment key={index}>
                                        {!taskId && <Heading type={HEADING.H3} >Week {index + 1} : </Heading>}
                                        <SelectDropdown
                                            type='text'
                                            placeHolder='Please select weekly Frequency'
                                            name='SelectFrequency'
                                            onChangeCb={(event, rules) => onChangeTaskFrequencyHandler(event, rules, index)}
                                            label='Select Frequency'
                                            value={item?.SelectFrequency?.value}
                                            errors={item?.SelectFrequency?.errors}
                                            rules={item?.SelectFrequency?.rules}
                                            options={TASK_FREQUENCY_OPTIONS}
                                            formSubmitted={taskForWeeksFieldsTouch}
                                            defaultValue={item?.SelectFrequency?.value.length !== 0 ? { label: item?.SelectFrequency?.value } : null}
                                        />
                                        {item.dateAndTime.map((item, idx) => {
                                            return <ResponsiveBox key={idx} size={500}>
                                                <DatePicker
                                                    type='text'
                                                    name='scheduledDate'
                                                    onChangeCb={(event, rules) => onChangeTaskFrequencyHandler(event, rules, index, idx)}
                                                    label='Date'
                                                    value={item?.scheduledDate?.value}
                                                    errors={item?.scheduledDate?.errors}
                                                    rules={item?.scheduledDate?.rules}
                                                    formSubmitted={taskForWeeksFieldsTouch}
                                                    minDate={getWeekDates(episodeDetailsForCreatePage.startTime, episodeDetailsForCreatePage.endTime, index + 1).startDate}
                                                    maxDate={getWeekDates(episodeDetailsForCreatePage.startTime, episodeDetailsForCreatePage.endTime, index + 1).endDate}
                                                />
                                                <TextInput
                                                    type='time'
                                                    name='StartTime'
                                                    onChangeCb={(event, rules) => onChangeTaskFrequencyHandler(event, rules, index, idx)}
                                                    label='Start Time'
                                                    value={item?.StartTime?.value}
                                                    errors={item?.StartTime?.errors}
                                                    rules={item?.StartTime?.rules}
                                                    formSubmitted={taskForWeeksFieldsTouch}
                                                />
                                                <TextInput
                                                    type='time'
                                                    name='EndTime'
                                                    onChangeCb={(event, rules) => onChangeTaskFrequencyHandler(event, rules, index, idx)}
                                                    label='End Time'
                                                    value={item?.EndTime?.value}
                                                    errors={item?.EndTime?.errors}
                                                    rules={item?.EndTime?.rules}
                                                    formSubmitted={taskForWeeksFieldsTouch}
                                                />
                                            </ResponsiveBox>
                                        })}
                                        {index > 0 && <Button onClickCb={() => dispatch(setRemoveTaskForWeek(index))} variant={BUTTON_TYPE.LIGHT_WITH_NO_BORDER} className={`mt-2 ${(index < customTaskDate.length - 1) && 'mb-4'} ${(index > 0 && index > customTaskDate.length - 1) && 'mb-2'}`}>Remove</Button>}
                                    </React.Fragment>
                                )
                            })}

                            {taskForWeeks.length + 1 <= calculateEpisodeWeeks(episodeDetailsForCreatePage.startTime, episodeDetailsForCreatePage.endTime) &&
                                <>
                                    {(taskForWeeks.length < 2 && !taskId) &&
                                        <CheckboxWLabel
                                            containerStyles={{ margin: "10px 0 20px" }}
                                            checked={reflectScheduleCheckBox}
                                            label="Reflect this schedule for all remaining weeks"
                                            onChangeCb={handleReflectScheduleClick}
                                        />
                                    }

                                    {
                                        (!reflectScheduleCheckBox && !taskId) &&
                                        <Button
                                            className='mt-2'
                                            variant={BUTTON_TYPE.PRIMARY_LIGHT_WITH_BORDER}
                                            onClickCb={() => {
                                                dispatch(setTaskForWeeksFieldsTouch(false))

                                                if (taskForWeeks.length + 1 <= calculateEpisodeWeeks(episodeDetailsForCreatePage.startTime, episodeDetailsForCreatePage.endTime)) {
                                                    dispatch(setAddNewTaskForWeek(WEEKS_INFORMATION))
                                                    dispatch(setReflectScheduleCheckBox(false))
                                                }
                                            }}
                                            prefixProps={{ icon: VEC_ICON_NAME.ADD_NEW_ICON }}
                                        >Add for other week</Button>
                                    }
                                </>
                            }
                        </>
                    }

                    {createTaskStates.frequency.value === "No" &&
                        <>
                            <Heading>Choose task creation date</Heading>
                            {customTaskDate.map((item, index) => {
                                return (
                                    <React.Fragment key={index}>
                                        <ResponsiveBox size={500}>
                                            <DatePicker
                                                type='text'
                                                name='scheduledDate'
                                                onChangeCb={(event, rules) => onChangeCustomDateHandler(event, rules, index)}
                                                label='Date'
                                                value={item?.scheduledDate?.value}
                                                errors={item?.scheduledDate?.errors}
                                                rules={item?.scheduledDate?.rules}
                                                formSubmitted={taskForWeeksFieldsTouch}
                                            />
                                            <TextInput
                                                type='time'
                                                name='StartTime'
                                                onChangeCb={(event, rules) => onChangeCustomDateHandler(event, rules, index)}
                                                label='Start Time'
                                                value={item?.StartTime?.value}
                                                errors={item?.StartTime?.errors}
                                                rules={item?.StartTime?.rules}
                                                formSubmitted={taskForWeeksFieldsTouch}
                                            />
                                            <TextInput
                                                type='time'
                                                name='EndTime'
                                                onChangeCb={(event, rules) => onChangeCustomDateHandler(event, rules, index)}
                                                label='End Time'
                                                value={item?.EndTime?.value}
                                                errors={item?.EndTime?.errors}
                                                rules={item?.EndTime?.rules}
                                                formSubmitted={taskForWeeksFieldsTouch}
                                            />

                                        </ResponsiveBox>
                                        {index > 0 && <Button onClickCb={() => dispatch(setRemoveCustomTaskDate(index))} variant={BUTTON_TYPE.LIGHT_WITH_NO_BORDER} className={`mt-2 ${(index < customTaskDate.length - 1) && 'mb-4'}`}>Remove</Button>}
                                    </React.Fragment>)
                            })}
                            <Button
                                className='mt-2'
                                variant={BUTTON_TYPE.PRIMARY_LIGHT_WITH_BORDER}
                                onClickCb={() => {
                                    dispatch(setTaskForWeeksFieldsTouch(false))
                                    dispatch(setAddNewCustomTaskDate(CUSTOM_TASK_DATE))
                                }}
                                prefixProps={{ icon: VEC_ICON_NAME.ADD_NEW_ICON }}
                            >Add for other date</Button>
                        </>
                    }

                    {(createTaskStates.frequencyChanged.value === "No" && taskId) &&
                        <>
                            <Heading>Here, you can modify a specific schedule</Heading>
                            {existingTaskSchedule?.map((item, index) => {
                                return (
                                    <React.Fragment key={index}>
                                        <div className='d-flex justify-content-between'>
                                            <Heading type={HEADING.H3} >Week {index + 1} : </Heading>
                                            <Button
                                                className='mt-2'
                                                variant={BUTTON_TYPE.PRIMARY_LIGHT_WITH_BORDER}
                                                onClickCb={() => {
                                                    dispatch(setTaskForWeeksFieldsTouch(false))
                                                    dispatch(setAddNewScheduleInExistingSchedules({ index }))
                                                }}
                                                prefixProps={{ icon: VEC_ICON_NAME.ADD_NEW_ICON }}
                                            >New Schedule</Button>
                                        </div>
                                        {item.dateAndTime.map((item, idx) => {
                                            return (
                                                <div key={idx}>
                                                    <div className='d-flex column-gap-1 align-items-center m-0'>
                                                        <DatePicker
                                                            type='text'
                                                            name='date'
                                                            onChangeCb={(event, rules) => onChangeExistingSchedule(event, rules, index, idx)}
                                                            label='Date'
                                                            value={item?.date?.value}
                                                            errors={item?.date?.errors}
                                                            rules={item?.date?.rules}
                                                            formSubmitted={taskForWeeksFieldsTouch}
                                                        // minDate={getWeekDates(episodeDetailsForCreatePage.startTime, episodeDetailsForCreatePage.endTime, index + 1).startDate}
                                                        // maxDate={getWeekDates(episodeDetailsForCreatePage.startTime, episodeDetailsForCreatePage.endTime, index + 1).endDate}
                                                        // disabled={new Date() > new Date(item?.date?.value)}
                                                        />
                                                        <TextInput
                                                            type='time'
                                                            name='inTime'
                                                            onChangeCb={(event, rules) => onChangeExistingSchedule(event, rules, index, idx)}
                                                            label='Start Time'
                                                            value={item?.inTime?.value}
                                                            errors={item?.inTime?.errors}
                                                            rules={item?.inTime?.rules}
                                                            formSubmitted={taskForWeeksFieldsTouch}
                                                        // disabled={new Date() > new Date(item?.date?.value)}
                                                        />
                                                        <TextInput
                                                            type='time'
                                                            name='outTime'
                                                            onChangeCb={(event, rules) => onChangeExistingSchedule(event, rules, index, idx)}
                                                            label='End Time'
                                                            value={item?.outTime?.value}
                                                            errors={item?.outTime?.errors}
                                                            rules={item?.outTime?.rules}
                                                            formSubmitted={taskForWeeksFieldsTouch}
                                                        // disabled={new Date() > new Date(item?.date?.value)}
                                                        />
                                                        {item?.id?.value &&
                                                            <div className='d-flex justify-content-end cursor mt-2 ms-2 me-1' id='update-schedule' onClick={() => {
                                                                dispatch(setShowUpdateScheduleModal(true))
                                                                dispatch(setSelectedScheduleData({ parentIndex: index, childIndex: idx, data: item }))
                                                            }}>
                                                                <Icons iconName={VEC_ICON_NAME.CORRECT_ICON} style={{ width: "20px" }} />
                                                            </div>
                                                        }
                                                        <div className='d-flex justify-content-end cursor mt-2' onClick={() => {
                                                            dispatch(setShowDeleteScheduleModal(true))
                                                            dispatch(setSelectedScheduleData({ parentIndex: index, childIndex: idx, data: item }))
                                                        }}>
                                                            <Icons iconName={VEC_ICON_NAME.SideNavDeleteIcon} />
                                                        </div>
                                                    </div>
                                                </div>)
                                        })}

                                        {(new Date() < new Date(item.dateAndTime[0].date.value)) &&
                                            <Button
                                                onClickCb={() => {
                                                    dispatch(setShowRemoveExistingScheduleModal(true))
                                                    dispatch(setSelectedIndexOfSchedule(index))
                                                }}
                                                variant={BUTTON_TYPE.LIGHT_WITH_NO_BORDER}
                                                className={`mt-2 ${(!customTaskDate.length - 1) && 'mb-4'}`}
                                            >Remove</Button>
                                        }
                                    </React.Fragment>
                                )
                            })}
                        </>
                    }
                </div>
                <div className="mt-5">
                    <Button variant={BUTTON_TYPE.PRIMARY_LIGHT_WITH_BORDER} onClickCb={() => {
                        dispatch(setTaskDetailsById({}))
                        dispatch(setUpdatedCreateTaskStates(CREATE_TASK_STATES))
                        navigate(`/${EPISODE_MANAGEMENT.EPISODE_MANAGEMENT}/${EPISODE_MANAGEMENT.CHILD_ROUTS.EPISODE_DETAILS}/${episodeId}?at=2`)
                    }}>
                        Back
                    </Button>
                    <Button className="ms-3" onClickCb={handleCreateTaskClick}>
                        Save
                    </Button>
                </div>
            </Container>

            <ConfirmationModal
                isOpen={reflectScheduleModal}
                toggle={() => dispatch(setReflectScheduleModal(!reflectScheduleModal))}
                bodyContent='The same schedule will be applied for all the weeks, you can come back and update anytime for a specific week.'
                successButtonText=""
                closeButtonText="Ok"
            />

            <ConfirmationModal
                isOpen={showRemoveExistingScheduleModal}
                toggle={() => dispatch(setShowRemoveExistingScheduleModal(!showRemoveExistingScheduleModal))}
                bodyContent='Would you really like to delete this weeks schedule?'
                successButtonText="Remove"
                closeButtonText="Close"
                onSuccessCb={() => {
                    dispatch(setRemoveSchedule(selectedIndexOfSchedule))
                    dispatch(setShowRemoveExistingScheduleModal(!showRemoveExistingScheduleModal))
                }}
            />

            <ConfirmationModal
                isOpen={ShowDeleteScheduleModal}
                toggle={() => dispatch(setShowDeleteScheduleModal(!ShowDeleteScheduleModal))}
                bodyContent='Are you sure do you want to remove this schedule?'
                successButtonText="Remove"
                closeButtonText="Close"
                onSuccessCb={() => {
                    if (selectedScheduleData.data.id.value) {
                        dispatch(deleteSchedule({ scheduleId: selectedScheduleData.data.id.value, taskId, token }))
                    } else {
                        dispatch(setDeleteSelectedSchedule({ parentIndex: selectedScheduleData.parentIndex, childIndex: selectedScheduleData.childIndex }))
                        dispatch(setShowDeleteScheduleModal(false))
                    }
                }}
            />

            <ConfirmationModal
                isOpen={showUpdateScheduleModal}
                toggle={() => dispatch(setShowUpdateScheduleModal(!showUpdateScheduleModal))}
                bodyContent='Are you sure do you want to update this schedule?'
                successButtonText="Update"
                closeButtonText="Close"
                onSuccessCb={() => {
                    if (selectedScheduleData.data.id.value) {
                        dispatch(updateScheduleById({
                            scheduleId: selectedScheduleData.data.id.value,
                            data: {
                                "date": moment(selectedScheduleData.data.date.value).toISOString(),
                                "inTime": selectedScheduleData.data.inTime.value,
                                "outTime": selectedScheduleData.data.outTime.value
                            },
                            token
                        }))
                    }
                }}
            />

            <ViewAvailabilityModal
                isOpen={showViewAvailabilityModal}
                toggle={() => dispatch(setShowViewAvailabilityModal(!showViewAvailabilityModal))}
                events={scheduleTaskList}
            />
        </Loadable >
    )
}

export default CreateTask
