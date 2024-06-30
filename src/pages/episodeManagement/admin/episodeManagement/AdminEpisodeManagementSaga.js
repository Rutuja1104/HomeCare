import store from '../../../../store/store';

import { all, put, takeLatest } from 'redux-saga/effects';
import { PAGE_STATE } from '../../../../libs/constant';
import { setLoadingState } from '../EpisodeManagementSlice';
import {
    componentKey,
    setAssigneeByEpisodeId,
    setAssigneeByRole,
    setBasicEpisodeDetails,
    setDisciplineByTaskType,
    setEmergencyVitalRanges,
    setEpisodeDetailsForCreatePage,
    setInsuranceDetails,
    setIsMedicationCreated,
    setIsNavigateToProgressNoteList,
    setIsNavigateToTaskList,
    setMedicationById,
    setMedicationPaginationState,
    setMedications,
    setPatientDetails,
    setProgressDetailById,
    setProgressNotesList,
    setProgressNotesPaginationState,
    setScheduleEpisodeTaskList,
    setScheduleTaskList,
    setShowDeleteMedicationModal,
    setShowDeleteProgressNoteModal,
    setShowDeleteScheduleModal,
    setShowDeleteTaskModal,
    setTaskDetailsById,
    setTaskList,
    setTaskListPaginationState,
    setTaskTypeList,
    setVitalSigns,
    setFormComponent,
    setFormData,
    setFormList,
    setShowUpdateScheduleModal,
    setUpdatedMedicationDetails,
} from './AdminEpisodeManagementSlice';
import {
    EPISODE_BASIC_DETAILS_MAPPING_KEYS,
    EPISODE_VITAL_SIGN_RANGES,
    INSURANCE_DETAILS_MAPPING_KEY,
    PHYSICIAN_BILLING_ADDRESS_MAPPING_KEYS,
    PHYSICIAN_DETAILS_MAPPING_KEYS
} from './constants';

import EpisodeManagementService from '../../../../services/EpisodeManagementService';
import General from '../../../../libs/utility/General';
import { toast } from 'react-toastify';
import moment from 'moment';

export const {
    getEpisodeDetailsById,
    getTaskListByEpisodeId,
    getProgressNotesByEpisodeId,
    getAssigneeByEpisodeId,
    postCreateProgressNote,
    getTaskTypeByDiscipline,
    getVitalSigns,
    getAllMedications,
    postMedications,
    getMedicationDetailsByEpisodeId,
    getAssigneeByDisciplineAndRole,
    postCreateTask,
    getSchedulesByEpisode,
    getEmergencyVitals,
    deleteTaskAndSchedule,
    getTaskByTaskId,
    patchUpdateExistingTasks,
    deleteProgressNote,
    getProgressNoteById,
    patchUpdateExistingProgressNotes,
    deleteMedication,
    deleteSchedule,
    createForm,
    getFilledFormDataById,
    getFormComponentById,
    getEpisodePurposeByEpisodeId,
    updateEpisodeFormStatus,
    updateScheduleById,
    getMedicationDetailsById,
    updateMedicationDetails
} = {
    getEpisodeDetailsById: (payload) => {
        return {
            type: 'EPISODE_MANAGEMENT_ADMIN/EPISODE_DETAILS/GET_EPISODE_DETAILS_BY_ID',
            payload
        };
    },
    getTaskListByEpisodeId: (payload) => {
        return {
            type: 'EPISODE_MANAGEMENT_ADMIN/EPISODE_DETAILS/GET_TASK_LIST_BY_EPISODE_ID',
            payload
        };
    },
    getProgressNotesByEpisodeId: (payload) => {
        return {
            type: 'EPISODE_MANAGEMENT_ADMIN/EPISODE_DETAILS/GET_PROGRESS_LIST_BY_EPISODE_ID',
            payload
        };
    },
    getAssigneeByEpisodeId: (payload) => {
        return {
            type: 'EPISODE_MANAGEMENT_ADMIN/EPISODE_DETAILS/GET_ASSIGNEE_BY_EPISODE_ID',
            payload
        };
    },
    postCreateProgressNote: (payload) => {
        return {
            type: 'EPISODE_MANAGEMENT_ADMIN/EPISODE_DETAILS/POST_CREATE_PROGRESS_NOTEs',
            payload
        };
    },
    getTaskTypeByDiscipline: (payload) => {
        return {
            type: 'EPISODE_MANAGEMENT_ADMIN/EPISODE_DETAILS/GET_PROFESSIONAL_TASK_TYPE_BY_DISCIPLINE',
            payload
        };
    },
    getVitalSigns: (payload) => {
        return {
            type: 'EPISODE_MANAGEMENT_ADMIN/EPISODE_DETAILS/GET_VITAL_SIGNS',
            payload
        };
    },
    getAllMedications: (payload) => {
        return {
            type: 'EPISODE_MANAGEMENT_ADMIN/EPISODE_DETAILS/GET_ALL_MEDICATIONS',
            payload
        };
    },
    postMedications: (payload) => {
        return {
            type: 'EPISODE_MANAGEMENT_ADMIN/EPISODE_DETAILS/POST_MEDICATIONS',
            payload
        };
    },
    getMedicationDetailsByEpisodeId: (payload) => {
        return {
            type: 'EPISODE_MANAGEMENT_ADMIN/EPISODE_DETAILS/GET_MEDICATION_BY_ID',
            payload
        }
    },
    getAssigneeByDisciplineAndRole: (payload) => {
        return {
            type: 'EPISODE_MANAGEMENT_ADMIN/EPISODE_DETAILS/GET_ASSIGNEE_BY_DIS_AND_ROLE',
            payload
        }
    },
    postCreateTask: (payload) => {
        return {
            type: 'EPISODE_MANAGEMENT_ADMIN/EPISODE_DETAILS/POST_CREATE_TASK',
            payload
        }
    },
    getSchedulesByEpisode: (payload) => {
        return {
            type: 'EPISODE_MANAGEMENT_ADMIN/EPISODE_DETAILS/GET_SCHEDULES_BY_EPISODE',
            payload
        }
    },
    getEmergencyVitals: (payload) => {
        return {
            type: 'EPISODE_MANAGEMENT_ADMIN/EPISODE_DETAILS/GET_EMERGENCY_VITALS',
            payload
        }
    },
    deleteTaskAndSchedule: (payload) => {
        return {
            type: 'EPISODE_MANAGEMENT_ADMIN/EPISODE_DETAILS/DELETE_TASKS',
            payload
        }
    },
    getTaskByTaskId: (payload) => {
        return {
            type: 'EPISODE_MANAGEMENT_ADMIN/EPISODE_DETAILS/GET_TASK_BY_TASK_ID',
            payload
        }
    },
    patchUpdateExistingTasks: (payload) => {
        return {
            type: 'EPISODE_MANAGEMENT_ADMIN/EPISODE_DETAILS/PATCH_UPDATE_EXISTING_TASKS',
            payload
        }
    },
    deleteProgressNote: (payload) => {
        return {
            type: 'EPISODE_MANAGEMENT_ADMIN/EPISODE_DETAILS/DELETE_PROGRESS_NOTE',
            payload
        }
    },
    getProgressNoteById: (payload) => {
        return {
            type: 'EPISODE_MANAGEMENT_ADMIN/EPISODE_DETAILS/GET_PROGRESS_NOTES_BY_ID',
            payload
        }
    },
    patchUpdateExistingProgressNotes: (payload) => {
        return {
            type: 'EPISODE_MANAGEMENT_ADMIN/EPISODE_DETAILS/PATCH_UPDATE_EXISTING_PROGRESS_NOTES',
            payload
        }
    },
    deleteMedication: (payload) => {
        return {
            type: 'EPISODE_MANAGEMENT_ADMIN/EPISODE_DETAILS/DELETE_MEDICATION',
            payload
        }
    },
    deleteSchedule: (payload) => {
        return {
            type: 'EPISODE_MANAGEMENT_ADMIN/EPISODE_DETAILS/DELETE_SCHEDUlE_8',
            payload
        }
    },
    createForm: (payload) => {
        return {
            type: "EPISODE_MANAGEMENT_ADMIN/EPISODE_DETAILS/FORM",
            payload,
        };
    },
    getFilledFormDataById: (payload) => {
        return {
            type: "EPISODE_MANAGEMENT_ADMIN/EPISODE_DETAILS/SUBMITTED_FORM",
            payload,
        };
    },

    getFormComponentById: (payload) => {
        return {
            type: "EPISODE_MANAGEMENT_ADMIN/EPISODE_DETAILS/VIEW_FORM",
            payload,
        };
    },

    getEpisodePurposeByEpisodeId: (payload) => {
        return {
            type: "EPISODE_MANAGEMENT_ADMIN/EPISODE_DETAILS/FORM_LIST",
            payload,
        };
    },
    updateEpisodeFormStatus: (payload) => {
        return {
            type: "EPISODE_MANAGEMENT_ADMIN/EPISODE_DETAILS/UPDATE_EPISODE_FORM_STATUS",
            payload,
        };
    },
    updateScheduleById: (payload) => {
        return {
            type: "EPISODE_MANAGEMENT_ADMIN/EPISODE_DETAILS/UPDATE_SCHEDULE",
            payload,
        };
    },
    getMedicationDetailsById: (payload) => {
        return {
            type: "EPISODE_MANAGEMENT_ADMIN/EPISODE_DETAILS/GET_MEDICATION_DETAILS_BY_ID",
            payload,
        };
    },
    updateMedicationDetails: (payload) => {
        return {
            type: "EPISODE_MANAGEMENT_ADMIN/EPISODE_DETAILS/UPDATE_MEDICATION_DETAILS_BY_ID",
            payload,
        };
    },
}

function* getEpisodeDetailsByIdAsync(action) {
    try {
        yield put(setLoadingState({ state: PAGE_STATE.LOADING, message: 'Fetching Patient Details...' }));

        const { agencyId, episodeId, token, isForOtherUse } = action.payload;
        const response = yield EpisodeManagementService.getEpisodeDetailsById(agencyId, episodeId, token);

        if (response.status === 200) {
            let episodeDetails = General.generateDataArray(EPISODE_BASIC_DETAILS_MAPPING_KEYS, response.data.episode);
            let physicianDetails = General.generateDataArray(
                PHYSICIAN_DETAILS_MAPPING_KEYS,
                response.data.episode.Physician
            );
            let physicianBillingAddress = General.generateDataArray(
                PHYSICIAN_BILLING_ADDRESS_MAPPING_KEYS,
                response.data.episode.Physician.billingAddress
            );
            let episodeVitalSignRange = General.generateDataArray(
                EPISODE_VITAL_SIGN_RANGES,
                response.data.emergencyVitals
            );

            let insuranceDetails = General.generateDataFromArrayOfObject(
                INSURANCE_DETAILS_MAPPING_KEY,
                response.data.episode.Patient.payer
            );

            physicianDetails = physicianDetails.flat().concat(physicianBillingAddress.flat());

            let finalEpisodeDetails = [...episodeDetails, [...physicianDetails], ...episodeVitalSignRange];

            yield put(setPatientDetails(response.data.episode.Patient));
            yield put(setBasicEpisodeDetails(finalEpisodeDetails));
            yield put(setInsuranceDetails(insuranceDetails))

            if (isForOtherUse) {
                yield put(setEpisodeDetailsForCreatePage(response.data.episode));
            }
        }
    } catch (error) {
        console.log('err: ', error);
    } finally {
        yield put(setLoadingState({ state: PAGE_STATE.PAGE_READY }));
    }
}

function* getTaskListByEpisodeIdAsync(action) {
    try {
        yield put(setLoadingState({ state: PAGE_STATE.LOADING, message: 'Fetching Patient Details...' }));

        const { agencyId, episodeId, status, limit, pageNumber, token } = action.payload;
        const response = yield EpisodeManagementService.getTaskListByEpisodeId(
            agencyId,
            episodeId,
            status,
            limit,
            pageNumber,
            token
        );

        if (response.status === 200) {
            yield put(setTaskList(response.data.tasks));
            yield put(setTaskListPaginationState({ totalTasks: response.data.totalRecords }));
        }
    } catch (error) {
        console.log('err: ', error);
    } finally {
        yield put(setLoadingState({ state: PAGE_STATE.PAGE_READY }));
    }
}

function* getProgressNotesByEpisodeIdAsync(action) {
    try {
        yield put(setLoadingState({ state: PAGE_STATE.LOADING, message: 'Fetching Patient Details...' }));

        const { agencyId, episodeId, status, limit, pageNumber, token } = action.payload;
        const response = yield EpisodeManagementService.getProgressNotesByEpisodeId(
            agencyId,
            episodeId,
            status,
            limit,
            pageNumber,
            token
        );

        if (response.status === 200) {
            yield put(setProgressNotesList(response.data.notes));
            yield put(setProgressNotesPaginationState({ totalNotes: response.data.totalRecords }));
        }
    } catch (error) {
        console.log('err: ', error);
    } finally {
        yield put(setLoadingState({ state: PAGE_STATE.PAGE_READY }));
    }
}

function* getAssigneeByEpisodeIdAsync(action) {
    try {
        yield put(setLoadingState({ state: PAGE_STATE.LOADING, message: 'Fetching Patient Details...' }));

        const { agencyId, episodeId, token } = action.payload;
        const response = yield EpisodeManagementService.getAssigneeByEpisodeId(agencyId, episodeId, token);

        if (response.status === 200) {
            const filteredData = response.data.map((item) => ({
                ...item,
                label: `${item?.nurse?.firstName} ${item?.nurse?.lastName}`,
                value: `${item?.Nurse?.firstName} ${item?.Nurse?.lastName}`
            }));
            yield put(setAssigneeByEpisodeId(filteredData));
        }
    } catch (error) {
        console.log('err: ', error);
    } finally {
        yield put(setLoadingState({ state: PAGE_STATE.PAGE_READY }));
    }
}

function* postCreateProgressNoteAsync(action) {
    try {
        yield put(setLoadingState({ state: PAGE_STATE.LOADING, message: 'Fetching Patient Details...' }));

        const { agencyId, episodeId, data, token } = action.payload;
        const response = yield EpisodeManagementService.postCreateProgressNote(agencyId, episodeId, data, token);

        if (response.status === 201) {
            yield put(setIsNavigateToProgressNoteList(true));
        }
    } catch (error) {
        console.log('err: ', error);
    } finally {
        yield put(setLoadingState({ state: PAGE_STATE.PAGE_READY }));
    }
}

function* getTaskTypeByDisciplineAsync(action) {
    try {
        yield put(setLoadingState({ state: PAGE_STATE.LOADING, message: 'Loading...' }));

        const { type, token } = action.payload;
        const response = yield EpisodeManagementService.getTaskTypeByDiscipline(type, token);

        if (response.status === 200) {
            const filteredData = response.data.map((item) => ({
                ...item,
                label: `${item.task}`,
                value: `${item.task}`
            }));
            yield put(setTaskTypeList(filteredData));
        }
    } catch (error) {
        console.log('err: ', error);
    } finally {
        yield put(setLoadingState({ state: PAGE_STATE.PAGE_READY }));
    }
}
function* getVitalSignsAsync(action) {
    try {
        const { agencyId, episodeId } = action.payload;
        yield put(setLoadingState({ state: PAGE_STATE.LOADING, message: 'Loading...' }));
        const response = yield EpisodeManagementService.getVitalSigns(agencyId, episodeId);
        yield put(setVitalSigns(response.data.vitals));
    } catch (error) {
        console.log('err: ', error);
    } finally {
        yield put(setLoadingState({ state: PAGE_STATE.PAGE_READY }));
    }
}

function* getAllMedicationsAsync(action) {
    try {
        yield put(setLoadingState({ state: PAGE_STATE.LOADING, message: 'Loading...' }));

        const { agencyId, episodeId, token, PageNumber, limit } = action.payload;
        const response = yield EpisodeManagementService.getAllMedications(agencyId, episodeId, token, PageNumber, limit);

        if (response.status == 200) {
            yield put(setMedicationPaginationState({ totalMedication: response.data.totalRecords }))
            yield put(setMedications(response.data.medications));
        }
    } catch (error) {
        console.log('err: ', error);
    } finally {
        yield put(setLoadingState({ state: PAGE_STATE.PAGE_READY }));
    }
}

function* postMedicationsAsync(action) {
    try {
        const { agencyId, episodeId, medicationDetails } = action.payload;
        yield put(setLoadingState({ state: PAGE_STATE.LOADING, message: 'Loading...' }));
        const data = medicationDetails?.map((item) => {
            return {
                drugName: item?.drug?.value,
                status: item?.status?.value,
                startDate: new Date(item?.startDate?.value).toISOString(),
                discontinuedDate: new Date(item?.discontinued?.value).toISOString(),
                dosageUnits: item?.dosageUnit?.value,
                class: 'Neutral',
                indication: 'Normal'
            };
        });

        const medication = {
            medication: data
        }
        const response = yield EpisodeManagementService.postMedications(agencyId, episodeId, medication);
        if (response?.status === 201) {
            toast.success("Medication created successfully")
            yield put(setIsMedicationCreated(true))
        }
    } catch (error) {
        console.log('err: ', error);
    } finally {
        yield put(setLoadingState({ state: PAGE_STATE.PAGE_READY }));
    }
}

function* getMedicationDetailsByEpisodeIdAsync(action) {
    try {
        const { agencyId, episodeId } = action.payload;
        yield put(setLoadingState({ state: PAGE_STATE.LOADING, message: 'Loading...' }));
        const response = yield EpisodeManagementService.getMedicationDetailsByEpisodeId(agencyId, episodeId);
        yield put(setMedicationById(response.data.medications));
    } catch (error) {
        console.log('err: ', error);
    } finally {
        yield put(setLoadingState({ state: PAGE_STATE.PAGE_READY }));
    }
}

function* getAssigneeByDisciplineAndRoleAsync(action) {
    try {
        yield put(setLoadingState({ state: PAGE_STATE.LOADING, message: 'Loading...' }))

        const { role, discipline, token } = action.payload
        const response = yield EpisodeManagementService.getAssigneeByDisciplineAndRole(role, token)

        if (response.status === 200) {
            const filteredData = response.data.map(item => ({ ...item, label: `${item.firstName} ${item.lastName}`, value: `${item.firstName} ${item.lastName}` }))
            yield put(setAssigneeByRole(filteredData))
        }
    } catch (error) {
        console.log('err: ', error)
    } finally {
        yield put(setLoadingState({ state: PAGE_STATE.PAGE_READY }))
    }
}

function* postCreateTaskAsync(action) {
    try {
        yield put(setLoadingState({ state: PAGE_STATE.LOADING, message: 'Fetching Patient Details...' }))

        const { agencyId, episodeId, data, token } = action.payload
        const response = yield EpisodeManagementService.postCreateTask(agencyId, episodeId, data, token)

        if (response.status === 201) {
            yield put(setIsNavigateToTaskList(true))
            toast.success("Task created successfully!")
        }
    } catch (error) {
        console.log('err: ', error)
    } finally {
        yield put(setLoadingState({ state: PAGE_STATE.PAGE_READY }))
    }
}

function* getSchedulesByEpisodeAsync(action) {
    try {
        yield put(setLoadingState({ state: PAGE_STATE.LOADING, message: 'Loading...' }))

        const { agencyId, nurseId, staffId, token, episodeId } = action.payload
        const response = yield EpisodeManagementService.getSchedulesByEpisode(agencyId, nurseId, staffId, token, episodeId)

        if (response.status === 200) {
            if (episodeId) {
                const filteredData = response.data.map(item => ({ title: `${item.Task.taskType}`, start: `${moment(item.date).format("YYYY-MM-DD")} ${moment(`${moment(item.date).format("YYYY-MM-DD")} ${item.inTime}`).format("HH:mm")}:00`, end: `${moment(item.date).format("YYYY-MM-DD")} ${moment(`${moment(item.date).format("YYYY-MM-DD")} ${item.outTime}`).format("HH:mm")}:00` }))
                yield put(setScheduleEpisodeTaskList(filteredData))
            } else {
                const filteredData = response.data.map(item => ({ title: `${item.Task.taskType}`, start: `${moment(item.date).format("YYYY-MM-DD")} ${moment(`${moment(item.date).format("YYYY-MM-DD")} ${item.inTime}`).format("HH:mm")}:00`, end: `${moment(item.date).format("YYYY-MM-DD")} ${moment(`${moment(item.date).format("YYYY-MM-DD")} ${item.outTime}`).format("HH:mm")}:00` }))
                yield put(setScheduleTaskList(filteredData))
            }
        }
    } catch (error) {
        console.log('err: ', error)
    } finally {
        yield put(setLoadingState({ state: PAGE_STATE.PAGE_READY }))
    }
}

function* getEmergencyVitalsAsync(action) {
    try {
        yield put(setLoadingState({ state: PAGE_STATE.LOADING, message: 'Loading...' }))

        const { agencyId, token } = action.payload
        const response = yield EpisodeManagementService.getEmergencyVitals(agencyId, token)

        if (response.status === 200) {
            yield put(setEmergencyVitalRanges(response.data))
        }
    } catch (error) {
        console.log('err: ', error)
    } finally {
        yield put(setLoadingState({ state: PAGE_STATE.PAGE_READY }))
    }
}

function* deleteTaskAndScheduleAsync(action) {
    try {
        yield put(setLoadingState({ state: PAGE_STATE.LOADING, message: 'Loading...' }))

        const { agencyId, episodeId, taskId, TaskListPaginationState, token } = action.payload
        const response = yield EpisodeManagementService.deleteTaskAndSchedule(agencyId, episodeId, taskId, token)

        if (response.status === 200) {
            yield put(getTaskListByEpisodeId({ agencyId, episodeId, status: TaskListPaginationState.Status.value, limit: TaskListPaginationState.PageSize, pageNumber: TaskListPaginationState.PageNumber, token }))
            yield put(getSchedulesByEpisode({ episodeId, agencyId, token, nurseId: "", staffId: "" }))
            toast.success("Task Deleted Successfully!")
        }
    } catch (error) {
        console.log('err: ', error)
    } finally {
        yield put(setShowDeleteTaskModal(false))
        yield put(setLoadingState({ state: PAGE_STATE.PAGE_READY }))
    }
}

function* getTaskByTaskIdAsync(action) {
    try {
        yield put(setLoadingState({ state: PAGE_STATE.LOADING, message: 'Loading...' }))

        const { taskId, token } = action.payload
        const response = yield EpisodeManagementService.getTaskByTaskId(taskId, token)

        if (response.status === 200) {
            yield put(setTaskDetailsById(response.data))
        }
    } catch (error) {
        console.log('err: ', error)
    } finally {
        yield put(setLoadingState({ state: PAGE_STATE.PAGE_READY }))
    }
}

function* patchUpdateExistingTasksAsync(action) {
    try {
        yield put(setLoadingState({ state: PAGE_STATE.LOADING, message: 'Updating Task Details...' }))

        const { agencyId, episodeId, taskId, data, token } = action.payload
        const response = yield EpisodeManagementService.patchUpdateExistingTasks(agencyId, episodeId, taskId, data, token)

        if (response.status === 200) {
            yield put(setIsNavigateToTaskList(true))
            toast.success("Task updated successfully!")
        }
    } catch (error) {
        console.log('err: ', error)
    } finally {
        yield put(setLoadingState({ state: PAGE_STATE.PAGE_READY }))
    }
}

function* deleteProgressNoteAsync(action) {
    try {
        yield put(setLoadingState({ state: PAGE_STATE.LOADING, message: 'Loading...' }))

        const { agencyId, episodeId, noteId, ProgressNotesPaginationState, token } = action.payload
        const response = yield EpisodeManagementService.deleteProgressNote(agencyId, episodeId, noteId, token)

        if (response.status === 200) {
            yield put(getProgressNotesByEpisodeId({ agencyId, episodeId, status: ProgressNotesPaginationState.Status.value, limit: ProgressNotesPaginationState.PageSize, pageNumber: ProgressNotesPaginationState.PageNumber, token }))
            toast.success("Progress Note Deleted Successfully!")
        }
    } catch (error) {
        console.log('err: ', error)
    } finally {
        yield put(setShowDeleteProgressNoteModal(false))
        yield put(setLoadingState({ state: PAGE_STATE.PAGE_READY }))
    }
}

function* getProgressNoteByIdAsync(action) {
    try {
        yield put(setLoadingState({ state: PAGE_STATE.LOADING, message: 'Loading...' }))

        const { agencyId, episodeId, noteId, token } = action.payload
        const response = yield EpisodeManagementService.getProgressNoteById(agencyId, episodeId, noteId, token)

        if (response.status === 200) {
            yield put(setProgressDetailById(response.data))
        }
    } catch (error) {
        console.log('err: ', error)
    } finally {
        yield put(setLoadingState({ state: PAGE_STATE.PAGE_READY }))
    }
}

function* patchUpdateExistingProgressNotesAsync(action) {
    try {
        yield put(setLoadingState({ state: PAGE_STATE.LOADING, message: 'Updating Progress Details...' }))

        const { agencyId, episodeId, noteId, data, token } = action.payload
        const response = yield EpisodeManagementService.patchUpdateExistingProgressNotes(agencyId, episodeId, noteId, data, token)

        if (response.status === 200) {
            yield put(setIsNavigateToProgressNoteList(true))
            toast.success("Progress note updated successfully!")
        }
    } catch (error) {
        console.log('err: ', error)
    } finally {
        yield put(setLoadingState({ state: PAGE_STATE.PAGE_READY }))
    }
}

function* deleteMedicationAsync(action) {
    try {
        yield put(setLoadingState({ state: PAGE_STATE.LOADING, message: 'Loading...' }))

        const { agencyId, medicationId, token, episodeId, MedicationPaginationState } = action.payload
        const response = yield EpisodeManagementService.deleteMedication(agencyId, medicationId, token)

        if (response.status === 200) {
            yield put(getAllMedications({ agencyId, episodeId, token, PageNumber: MedicationPaginationState.PageNumber, limit: MedicationPaginationState.PageSize }))
            toast.success("Medication Deleted Successfully!")
        }
    } catch (error) {
        console.log('err: ', error)
    } finally {
        yield put(setShowDeleteMedicationModal(false))
        yield put(setLoadingState({ state: PAGE_STATE.PAGE_READY }))
    }
}
function* createFormAsync(action) {
    try {
        const { data, episodeId, agencyId, userId, formId } = action.payload;
        yield put(setLoadingState({ state: PAGE_STATE.LOADING, message: "Fetching Details" }));
        const response = yield EpisodeManagementService.createForm(data, episodeId, agencyId, userId, formId);
        if (response.status === 201) {
            toast.success("Form Created successfully!");
        }
    } catch (error) {
        console.log("err", error);
        toast.error(error);
    } finally {
        yield put(setLoadingState({ state: PAGE_STATE.PAGE_READY }));
    }
}

function* getFilledFormDataByIdAsync(action) {
    const { episodeId, formId } = action.payload;
    try {
        yield put(setLoadingState({ state: PAGE_STATE.LOADING, message: "Fetching Details" }));
        const response = yield EpisodeManagementService.getFilledFormDataById(episodeId, formId);
        yield put(setFormData(response.data));
    } catch (error) {
        console.log("err", error);
        toast.error(error?.response?.data?.message);
    } finally {
        yield put(setLoadingState({ state: PAGE_STATE.PAGE_READY }));
    }
}

function* getFormComponentByIdAsync(action) {
    const { formId } = action.payload;
    try {
        yield put(setLoadingState({ state: PAGE_STATE.LOADING, message: "Fetching Details" }));
        const formData = yield EpisodeManagementService.getFormComponentById(formId);
        yield put(setFormComponent(formData[0]));
    } catch (error) {
        console.log("err", error);
        toast.error(error?.response?.data?.message);
    } finally {
        yield put(setLoadingState({ state: PAGE_STATE.PAGE_READY }));
    }
}

function* getEpisodePurposeByEpisodeIdAsync(action) {
    const { agencyId, episodeId, token } = action.payload;
    try {
        yield put(setLoadingState({ state: PAGE_STATE.LOADING, message: "Fetching Details" }));
        const response = yield EpisodeManagementService.getEpisodePurposeByEpisodeId(agencyId, episodeId, token);
        yield put(setFormList(response.data.episode.EpisodeForms));
    } catch (error) {
        console.log("err", error);
        toast.error(error?.response?.data?.message);
    } finally {
        yield put(setLoadingState({ state: PAGE_STATE.PAGE_READY }));
    }
}

function* updateEpisodeFormStatusAsync(action) {
    const { agencyId, episodeId, formId, status, token } = action.payload;
    try {
        yield put(setLoadingState({ state: PAGE_STATE.LOADING, message: "Fetching Details" }));
        const response = yield EpisodeManagementService.updateEpisodeFormStatus(episodeId, formId, { status });
        if (response.status === 200) {
            toast.success("Form status has been updated successfully");
            yield put(getEpisodePurposeByEpisodeId({ agencyId, episodeId, token }))
        }
    } catch (error) {
        console.log("err", error);
        toast.error(error?.response?.data?.message);
    } finally {
        yield put(setLoadingState({ state: PAGE_STATE.PAGE_READY }));
    }
}

function* deleteScheduleAsync(action) {
    try {
        yield put(setLoadingState({ state: PAGE_STATE.LOADING, message: 'Loading...' }))

        const { scheduleId, taskId, token } = action.payload
        const response = yield EpisodeManagementService.deleteSchedule(scheduleId, token)

        if (response.status === 200) {
            yield put(getTaskByTaskId({ taskId, token }))
            toast.success("Schedule Deleted Successfully!")
        }
    } catch (error) {
        console.log('err: ', error)
    } finally {
        yield put(setShowDeleteScheduleModal(false))
        yield put(setLoadingState({ state: PAGE_STATE.PAGE_READY }))
    }
}

function* updateScheduleByIdAsync(action) {
    try {
        yield put(setLoadingState({ state: PAGE_STATE.LOADING, message: 'Loading...' }))

        const { scheduleId, data, token } = action.payload
        const response = yield EpisodeManagementService.updateScheduleById(scheduleId, data, token)

        if (response.status === 200) {
            toast.success("Schedule updated Successfully!")
        }
    } catch (error) {
        console.log('err: ', error)
    } finally {
        yield put(setShowUpdateScheduleModal(false))
        yield put(setLoadingState({ state: PAGE_STATE.PAGE_READY }))
    }
}

function* getMedicationDetailsByIdAsync(action) {
    try {
        yield put(setLoadingState({ state: PAGE_STATE.LOADING, message: 'Loading...' }))

        const { agencyId, medicationId, token } = action.payload
        const response = yield EpisodeManagementService.getMedicationDetailsById(agencyId, medicationId, token)

        if (response.status === 200) {
            const data = response.data
            let object = {
                drug: { value: data.drugName, errors: {}, rules: { required: true } },
                status: { value: data.status, errors: {}, rules: { required: true } },
                dosageUnit: { value: data.dosageUnits, errors: {}, rules: { required: true } },
                startDate: { value: data.startDate, errors: {}, rules: { required: true } },
                discontinued: { value: data.discontinuedDate, errors: {}, rules: { required: true } },
                class: { value: data.class, errors: {}, rules: { required: true } },
                indication: { value: data.indication, errors: {}, rules: { required: true } },
            }
            yield put(setUpdatedMedicationDetails([object]))
        }
    } catch (error) {
        console.log('err: ', error)
    } finally {
        yield put(setShowUpdateScheduleModal(false))
        yield put(setLoadingState({ state: PAGE_STATE.PAGE_READY }))
    }
}

function* updateMedicationDetailsAsync(action) {
    try {
        const { agencyId, medicationId, medicationDetails, token } = action.payload;
        yield put(setLoadingState({ state: PAGE_STATE.LOADING, message: 'Loading...' }));

        const data = {
            drugName: medicationDetails[0]?.drug?.value,
            status: medicationDetails[0]?.status?.value,
            startDate: new Date(medicationDetails[0]?.startDate?.value).toISOString(),
            discontinuedDate: new Date(medicationDetails[0]?.discontinued?.value).toISOString(),
            dosageUnits: medicationDetails[0]?.dosageUnit?.value,
            class: 'Neutral',
            indication: 'Normal'
        }

        const response = yield EpisodeManagementService.updateMedicationDetails(agencyId, medicationId, data, token);
        if (response?.status === 200) {
            toast.success("Medication updated successfully")
            yield put(setIsMedicationCreated(true))
        }
    } catch (error) {
        console.log('err: ', error);
    } finally {
        yield put(setLoadingState({ state: PAGE_STATE.PAGE_READY }));
    }
}

function* rootSaga() {
    yield all([
        takeLatest(getEpisodeDetailsById().type, getEpisodeDetailsByIdAsync),
        takeLatest(getTaskListByEpisodeId().type, getTaskListByEpisodeIdAsync),
        takeLatest(getProgressNotesByEpisodeId().type, getProgressNotesByEpisodeIdAsync),
        takeLatest(getAssigneeByEpisodeId().type, getAssigneeByEpisodeIdAsync),
        takeLatest(postCreateProgressNote().type, postCreateProgressNoteAsync),
        takeLatest(getTaskTypeByDiscipline().type, getTaskTypeByDisciplineAsync),
        takeLatest(getVitalSigns().type, getVitalSignsAsync),
        takeLatest(getAllMedications().type, getAllMedicationsAsync),
        takeLatest(postMedications().type, postMedicationsAsync),
        takeLatest(getMedicationDetailsByEpisodeId().type, getMedicationDetailsByEpisodeIdAsync),
        takeLatest(getAssigneeByDisciplineAndRole().type, getAssigneeByDisciplineAndRoleAsync),
        takeLatest(postCreateTask().type, postCreateTaskAsync),
        takeLatest(getSchedulesByEpisode().type, getSchedulesByEpisodeAsync),
        takeLatest(getEmergencyVitals().type, getEmergencyVitalsAsync),
        takeLatest(deleteTaskAndSchedule().type, deleteTaskAndScheduleAsync),
        takeLatest(getTaskByTaskId().type, getTaskByTaskIdAsync),
        takeLatest(patchUpdateExistingTasks().type, patchUpdateExistingTasksAsync),
        takeLatest(deleteProgressNote().type, deleteProgressNoteAsync),
        takeLatest(getProgressNoteById().type, getProgressNoteByIdAsync),
        takeLatest(patchUpdateExistingProgressNotes().type, patchUpdateExistingProgressNotesAsync),
        takeLatest(deleteMedication().type, deleteMedicationAsync),
        takeLatest(deleteSchedule().type, deleteScheduleAsync),
        takeLatest(createForm().type, createFormAsync),
        takeLatest(getFilledFormDataById().type, getFilledFormDataByIdAsync),
        takeLatest(getFormComponentById().type, getFormComponentByIdAsync),
        takeLatest(getEpisodePurposeByEpisodeId().type, getEpisodePurposeByEpisodeIdAsync),
        takeLatest(updateEpisodeFormStatus().type, updateEpisodeFormStatusAsync),
        takeLatest(updateScheduleById().type, updateScheduleByIdAsync),
        takeLatest(getMedicationDetailsById().type, getMedicationDetailsByIdAsync),
        takeLatest(updateMedicationDetails().type, updateMedicationDetailsAsync),
    ]);
}

store.sagaManager.addSaga(componentKey, rootSaga);
