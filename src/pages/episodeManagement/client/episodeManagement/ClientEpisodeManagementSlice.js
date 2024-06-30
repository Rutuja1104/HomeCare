import store from "../../../../store/store"
import { CREATE_TASK_STATES, MEDICATION_DETAILS } from "./constants"
import { CUSTOM_TASK_DATE, WEEKS_INFORMATION } from "./constants"

export const componentKey = 'CLIENT_EPISODE_MANAGEMENT_ADMIN/EPISODE_DETAILS'

const { actions } = store.reducerManager.add({
    key: componentKey,
    addedReducers: {
        setPatientDetails: (state, action) => {
            state.patientDetails = action.payload
        },
        setBasicEpisodeDetails: (state, action) => {
            state.basicEpisodeDetails = action.payload
        },
        setTaskListPaginationState: (state, action) => {
            state.TaskListPaginationState = { ...state.TaskListPaginationState, ...action.payload }
        },
        setProgressNotesPaginationState: (state, action) => {
            state.ProgressNotesPaginationState = { ...state.ProgressNotesPaginationState, ...action.payload }
        },
        setSelectedTasks: (state, action) => {
            state.selectedTasks = action.payload
        },
        setSelectedProgressNotes: (state, action) => {
            state.selectedProgressNotes = action.payload
        },
        setProgressNotesList: (state, action) => {
            state.ProgressNotesList = action.payload
        },
        setTaskList: (state, action) => {
            state.taskList = action.payload
        },
        setAddNoteStates: (state, action) => {
            let addNoteStates = { ...state.addNoteStates };

            Object.entries(action.payload).map(([key, value]) => {
                addNoteStates = {
                    ...state.addNoteStates,
                    [key]: {
                        ...state.addNoteStates[key],
                        ...value
                    },
                };

                state.addNoteStates = addNoteStates;
            })
        },
        setAddNoteFieldTouch: (state, action) => {
            state.addNoteFieldTouch = action.payload
        },
        setProgressNoteSignature: (state, action) => {
            state.ProgressNoteSignature = action.payload
        },
        setEpisodeDetailsForCreatePage: (state, action) => {
            state.episodeDetailsForCreatePage = action.payload
        },
        setAssigneeByEpisodeId: (state, action) => {
            state.assigneeByEpisodeId = action.payload
        },
        setSelectedProgressNoteAssignee: (state, action) => {
            state.selectedProgressNoteAssignee = action.payload
        },
        setIsNavigateToProgressNoteList: (state, action) => {
            state.isNavigateToProgressNoteList = action.payload
        },
        setDisciplineByTaskType: (state, action) => {
            state.disciplineByTaskType = action.payload
        },
        setSelectTaskTypeFieldsTouch: (state, action) => {
            state.selectTaskTypeFieldsTouch = action.payload
        },
        setTaskTypeStates: (state, action) => {
            let taskTypeStates = { ...state.taskTypeStates };

            Object.entries(action.payload).map(([key, value]) => {
                taskTypeStates = {
                    ...state.taskTypeStates,
                    [key]: {
                        ...state.taskTypeStates[key],
                        ...value
                    },
                };

                state.taskTypeStates = taskTypeStates;
            })
        },
        setSelectedTaskTypes: (state, action) => {
            const { name, value } = action.payload
            state.selectedTaskTypes[name] = value
        },
        setTaskTypeList: (state, action) => {
            state.taskTypeList = action.payload
        },
        setVitalSigns: (state, action) => {
            state.vitalSigns = action.payload
        },
        setMedications: (state, action) => {
            state.medications = action.payload
        },
        setMedicationDetails: (state, action) => {
            const { object, index } = action.payload;
            const updatedMedicationDetails = [...state.medicationDetails];
            const updatedItem = [...updatedMedicationDetails];

            if (object) {
                for (const [key, value] of Object.entries(object)) {
                    if (updatedItem[index][key]) {
                        updatedItem[index][key] = { ...updatedItem[index][key], ...value };
                    }
                }
            }

            state.medicationDetails = updatedItem;
        },
        setAddNewMedicationDetails: (state, action) => {
            state.medicationDetails = [...state.medicationDetails, action.payload];
        },
        setRemoveNewMedicationDetails: (state, action) => {
            const index = action.payload;
            state.medicationDetails = state.medicationDetails.filter((item, idx) => idx !== index);
        },
        setMedicationById: (state, action) => {
            state.medicationById = action.payload
        },
        setSelectedTaskType: (state, action) => {
            state.selectedTaskType = action.payload
        },
        setAssigneeByRole: (state, action) => {
            state.assigneeByRoleList = action.payload
        },
        setCreateTaskStates: (state, action) => {
            let createTaskStates = { ...state.createTaskStates };

            Object.entries(action.payload).map(([key, value]) => {
                createTaskStates = {
                    ...state.createTaskStates,
                    [key]: {
                        ...state.createTaskStates[key],
                        ...value
                    },
                };

                state.createTaskStates = createTaskStates;
            })
        },
        setAllRequiredFieldsTouched: (state, action) => {
            state.allRequiredFieldsTouched = action.payload
        },
        setTaskForWeeksFieldsTouch: (state, action) => {
            state.taskForWeeksFieldsTouch = action.payload
        },
        setAddNewCustomTaskDate: (state, action) => {
            state.customTaskDate = [...state.customTaskDate, { ...action.payload }]
        },
        setRemoveCustomTaskDate: (state, action) => {
            state.customTaskDate = state.customTaskDate.filter((item, idx) => idx !== action.payload)
        },
        setCustomTaskDates: (state, action) => {
            const { object, index } = action.payload;
            let informationObject = { ...state.customTaskDate[index] };

            Object.entries(object).map(([key, value]) => {
                informationObject = {
                    ...informationObject,
                    [key]: {
                        ...informationObject[key],
                        ...value,
                    },
                };

                state.customTaskDate[index] = informationObject;
            })
        },
        setAddFrequencyDateByOptions: (state, action) => {
            const { data, index } = action.payload
            state.taskForWeeks[index].dateAndTime = [...state.taskForWeeks[index].dateAndTime, data]
        },
        setClearFrequencyDateByOptions: (state, action) => {
            const { index } = action.payload
            state.taskForWeeks[index].dateAndTime = []
        },
        setTaskForWeeksState: (state, action) => {
            const { object, name, parentIndex, childIndex } = action.payload

            if (name == "SelectFrequency") {
                let copiedTaskForWeek = { ...state.taskForWeeks[parentIndex] }
                Object.entries(object).map(([key, value]) => {
                    copiedTaskForWeek = {
                        ...copiedTaskForWeek,
                        [key]: {
                            ...copiedTaskForWeek[key],
                            ...value,
                        },
                    };

                    state.taskForWeeks[parentIndex] = copiedTaskForWeek;
                })
            } else {
                let copiedTaskForWeek = { ...state.taskForWeeks[parentIndex] }
                let copiedDates = [...copiedTaskForWeek.dateAndTime]
                let date = { ...copiedDates[childIndex] }

                Object.entries(object).map(([key, value]) => {
                    date = {
                        ...date,
                        [key]: {
                            ...date[key],
                            ...value,
                        },
                    };
                    copiedDates[childIndex] = date
                })
                state.taskForWeeks[parentIndex].dateAndTime = copiedDates
            }
        },
        setAddNewTaskForWeek: (state, action) => {
            state.taskForWeeks = [...state.taskForWeeks, { ...action.payload }]
        },
        setAddNewScheduleInExistingSchedules: (state, action) => {
            const { index } = action.payload
            let copiedExistingSchedules = [...state.existingTaskSchedule]
            let copiedScheduleWeek = copiedExistingSchedules[index].dateAndTime
            copiedScheduleWeek = [...copiedScheduleWeek, {
                "inTime": { "value": "", "errors": {}, "rules": { "required": true } },
                "outTime": { "value": "", "errors": {}, "rules": { "required": true } },
                "date": { "value": "", "errors": {}, "rules": { "required": true } },
                "id": { "value": "", "errors": {}, "rules": { "required": true } }
            }]
            copiedExistingSchedules[index].dateAndTime = copiedScheduleWeek

            state.existingTaskSchedule = copiedExistingSchedules
        },
        setDeleteSelectedSchedule: (state, action) => {
            const { parentIndex, childIndex } = action.payload
            let copiedExistingSchedules = [...state.existingTaskSchedule]
            let copiedScheduleWeek = copiedExistingSchedules[parentIndex].dateAndTime.filter((_, idx) => idx !== childIndex)
            copiedExistingSchedules[parentIndex].dateAndTime = copiedScheduleWeek
            state.existingTaskSchedule = copiedExistingSchedules
        },
        setRemoveTaskForWeek: (state, action) => {
            state.taskForWeeks = state.taskForWeeks.filter((item, idx) => idx !== action.payload)
        },
        setIsNavigateToTaskList: (state, action) => {
            state.isNavigateToTaskList = action.payload
        },
        setReflectScheduleCheckBox: (state, action) => {
            state.reflectScheduleCheckBox = action.payload
        },
        setReflectScheduleModal: (state, action) => {
            state.reflectScheduleModal = action.payload
        },
        setIsMedicationCreated: (state, action) => {
            state.isMedicationCreated = action.payload
        },
        setShowViewAvailabilityModal: (state, action) => {
            state.showViewAvailabilityModal = action.payload
        },
        setScheduleTaskList: (state, action) => {
            state.scheduleTaskList = action.payload
        },
        setScheduleEpisodeTaskList: (state, action) => {
            state.scheduleEpisodeTaskList = action.payload
        },
        setEmergencyVitalRanges: (state, action) => {
            state.emergencyVitalRanges = action.payload
        },
        setSelectedTask: (state, action) => {
            state.selectedTask = action.payload
        },
        setShowDeleteTaskModal: (state, action) => {
            state.showDeleteTaskModal = action.payload
        },
        setTaskDetailsById: (state, action) => {
            state.taskDetailsById = action.payload
        },
        setUpdatedCreateTaskStates: (state, action) => {
            state.createTaskStates = action.payload
        },
        setExistingTaskSchedule: (state, action) => {
            state.existingTaskSchedule = action.payload
        },
        setUpdatedExistingSchedules: (state, action) => {
            const { object, parentIndex, childIndex } = action.payload;
            let existingTaskSchedule = { ...state.existingTaskSchedule[parentIndex] };
            let dateAndTime = existingTaskSchedule.dateAndTime[childIndex]

            Object.entries(object).map(([key, value]) => {
                dateAndTime = {
                    ...dateAndTime,
                    [key]: {
                        ...dateAndTime[key],
                        ...value,
                    },
                };

                existingTaskSchedule.dateAndTime[childIndex] = dateAndTime;
                state.existingTaskSchedule[parentIndex] = existingTaskSchedule
            })
        },
        setShowRemoveExistingScheduleModal: (state, action) => {
            state.showRemoveExistingScheduleModal = action.payload
        },
        setSelectedIndexOfSchedule: (state, action) => {
            state.selectedIndexOfSchedule = action.payload
        },
        setRemoveSchedule: (state, action) => {
            state.existingTaskSchedule = state.existingTaskSchedule.filter((item, index) => index !== action.payload)
        },
        setSelectedProgressNote: (state, action) => {
            state.selectedProgressNote = action.payload
        },
        setShowDeleteProgressNoteModal: (state, action) => {
            state.showDeleteProgressNoteModal = action.payload
        },
        setProgressDetailById: (state, action) => {
            state.progressDetailById = action.payload
        },
        setExistingProgressNoteDetails: (state, action) => {
            state.addNoteStates = { ...state.addNoteStates, ...action.payload }
        },
        setSelectedMedications: (state, action) => {
            state.selectedMedications = action.payload
        },
        setMedicationPaginationState: (state, action) => {
            state.MedicationPaginationState = { ...state.MedicationPaginationState, ...action.payload }
        },
        setSelectedMedicationToDelete: (state, action) => {
            state.selectedMedicationToDelete = action.payload
        },
        setShowDeleteMedicationModal: (state, action) => {
            state.showDeleteMedicationModal = action.payload
        },
        setInsuranceDetails: (state, action) => {
            state.insuranceDetails = action.payload
        },
        setShowDeleteScheduleModal: (state, action) => {
            state.ShowDeleteScheduleModal = action.payload
        },
        setSelectedScheduleData: (state, action) => {
            state.selectedScheduleData = action.payload
        },
        setFormData: (state, action) => {
            state.formData = action.payload;
        },
        setFormComponent: (state, action) => {
            state.formComponent = action.payload
        },
        setFormList: (state, action) => {
            state.formList = action.payload
        },
        setShowUpdateScheduleModal: (state, action) => {
            state.showUpdateScheduleModal = action.payload
        },
        setUpdatedMedicationDetails: (state, action) => {
            state.medicationDetails = action.payload
        }
    },
    initialReducerState: {
        patientDetails: {},
        basicEpisodeDetails: [],
        selectedTasks: [],
        selectedProgressNotes: [],
        taskList: [],
        ProgressNotesList: [],
        ProgressNoteSignature: "",
        addNoteFieldTouch: false,
        episodeDetailsForCreatePage: {},
        assigneeByEpisodeId: [],
        selectedProgressNoteAssignee: {},
        isNavigateToProgressNoteList: false,
        selectTaskTypeFieldsTouch: false,
        disciplineByTaskType: [],
        taskTypeList: [],
        assigneeByRoleList: [],
        selectedTaskType: "",
        allRequiredFieldsTouched: false,
        taskForWeeksFieldsTouch: false,
        isNavigateToTaskList: false,
        reflectScheduleCheckBox: false,
        reflectScheduleModal: false,
        scheduleTaskList: [],
        scheduleEpisodeTaskList: [],
        selectedTask: {},
        taskDetailsById: {},
        existingTaskSchedule: [],
        selectedMedications: [],
        insuranceDetails: [],
        selectedProgressNote: {},
        progressDetailById: {},
        selectedMedicationToDelete: {},

        showDeleteMedicationModal: false,
        showDeleteTaskModal: false,
        showSelectTaskTypeModal: false,
        showViewAvailabilityModal: false,
        showRemoveExistingScheduleModal: false,
        showDeleteProgressNoteModal: false,
        ShowDeleteScheduleModal: false,
        showUpdateScheduleModal: false,
        selectedTaskTypes: {},
        emergencyVitalRanges: {},
        selectedScheduleData: {},

        selectedIndexOfSchedule: -1,

        addNoteStates: {
            NotesType: { value: "", errors: {}, rules: { required: true } },
            Status: { value: "", errors: {}, rules: { required: true } },
            NoteDate: { value: "", errors: {}, rules: { required: true } },
            DescriptionDetails: { value: "", errors: {}, rules: { required: false } },
            SelectAssignee: { value: "", errors: {}, rules: { required: true } },
            PainSeverity: { value: "0", errors: {}, rules: { required: true } },
            DigitalSignature: { value: "" },
            LowBloodPressure: { value: "", errors: {}, rules: { required: true } },
            HighBloodPressure: { value: "", errors: {}, rules: { required: true } },
            LowDiastolic: { value: "", errors: {}, rules: { required: true } },
            HighDiastolic: { value: "", errors: {}, rules: { required: true } },
            LowSystolic: { value: "", errors: {}, rules: { required: true } },
            HighSystolic: { value: "", errors: {}, rules: { required: true } },
            LowPulse: { value: "", errors: {}, rules: { required: true } },
            HighPulse: { value: "", errors: {}, rules: { required: true } },
            LowTemperature: { value: "", errors: {}, rules: { required: true } },
            HighTemperature: { value: "", errors: {}, rules: { required: true } },
            LowRespiratory: { value: "", errors: {}, rules: { required: true } },
            HighRespiratory: { value: "", errors: {}, rules: { required: true } },
            LowBloodSugar: { value: "", errors: {}, rules: { required: true } },
            HighBloodSugar: { value: "", errors: {}, rules: { required: true } },
        },

        createTaskStates: CREATE_TASK_STATES,

        taskTypeStates: {
            Discipline: { value: "", errors: {}, rules: { required: true } },
        },

        TaskListPaginationState: {
            PageNumber: 1,
            PageSize: 10,
            FilterText: "",
            IsDesc: true,
            totalTasks: 10,
            Status: { label: "Open", value: "Open" },
        },

        MedicationPaginationState: {
            PageNumber: 1,
            PageSize: 10,
            FilterText: "",
            IsDesc: true,
            totalMedication: 10,
            Status: { label: "Open", value: "Open" },
        },

        ProgressNotesPaginationState: {
            PageNumber: 1,
            PageSize: 10,
            FilterText: "",
            IsDesc: true,
            totalNotes: 10,
            Status: { label: "Open", value: "Open" },
        },
        vitalSigns: [],
        medications: [],
        medicationDetails: [MEDICATION_DETAILS],
        medicationById: {},

        taskForWeeks: [WEEKS_INFORMATION],
        customTaskDate: [CUSTOM_TASK_DATE],
        isMedicationCreated: false,

        formData: {},
        formComponent: {},
        formList: [],
    }
})

export const { setPatientDetails, setBasicEpisodeDetails, setTaskListPaginationState, setSelectedTasks, setTaskList, setProgressNotesPaginationState, setSelectedProgressNotes, setProgressNotesList, setAddNoteStates, setAddNoteFieldTouch, setProgressNoteSignature, setEpisodeDetailsForCreatePage, setAssigneeByEpisodeId, setSelectedProgressNoteAssignee, setIsNavigateToProgressNoteList, setDisciplineByTaskType, setSelectTaskTypeFieldsTouch, setTaskTypeStates, setSelectedTaskTypes, setTaskTypeList, setVitalSigns, setMedications, setAddNewMedicationDetails, setRemoveNewMedicationDetails, setMedicationDetails, setMedicationById, setSelectedTaskType, setAssigneeByRole, setAllRequiredFieldsTouched, setCreateTaskStates, setTaskForWeeksFieldsTouch, setAddNewCustomTaskDate, setRemoveCustomTaskDate, setCustomTaskDates, setAddFrequencyDateByOptions, setClearFrequencyDateByOptions, setTaskForWeeksState, setAddNewTaskForWeek, setRemoveTaskForWeek, setIsNavigateToTaskList, setReflectScheduleCheckBox, setReflectScheduleModal, setIsMedicationCreated, setShowViewAvailabilityModal, setScheduleTaskList, setScheduleEpisodeTaskList, setEmergencyVitalRanges, setSelectedTask, setShowDeleteTaskModal, setTaskDetailsById, setUpdatedCreateTaskStates, setExistingTaskSchedule, setUpdatedExistingSchedules, setShowRemoveExistingScheduleModal, setSelectedIndexOfSchedule, setRemoveSchedule, setSelectedProgressNote, setShowDeleteProgressNoteModal, setProgressDetailById, setExistingProgressNoteDetails, setSelectedMedications, setMedicationPaginationState, setSelectedMedicationToDelete, setShowDeleteMedicationModal, setInsuranceDetails, setShowDeleteScheduleModal, setSelectedScheduleData, setLoadingState, setFormData, setFormComponent, setFormList, setAddNewScheduleInExistingSchedules, setDeleteSelectedSchedule, setShowUpdateScheduleModal, setUpdatedMedicationDetails } = actions
