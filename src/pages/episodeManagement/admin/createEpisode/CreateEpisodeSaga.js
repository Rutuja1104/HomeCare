import store from '../../../../store/store'
import { all, takeLatest, put } from 'redux-saga/effects'
import { PAGE_STATE } from '../../../../libs/constant'
import { componentKey, setEmergencyVitals, setMedicalOrder, setNavigateToEpisodePage, setPatientDetails, setPayerList, setStaffList, setUserListByProfessionalRole, setEpisodePurposeList } from './CreateEpisodeSlice'
import { setLoadingState } from '../EpisodeManagementSlice'
import EpisodeManagementService from '../../../../services/EpisodeManagementService'
import General from '../../../../libs/utility/General'
import { MEDICALLY_NECESSARY_DISCIPLINES } from '../constants'
import { toast } from 'react-toastify'

export const { getPatientDetailsById, getAssigneeUsingRole, getStaffListByAgencyId, postCreateEpisode, getEmergencyVitals, getAllPayerList, getEpisodePurposeUsingRole } = {
    getPatientDetailsById: (payload) => {
        return {
            type: 'EPISODE_MANAGEMENT_ADMIN/EPISODE_LISTING/GET_PATIENT_DETAILS_BY_ID_2',
            payload
        }
    },
    getAssigneeUsingRole: (payload) => {
        return {
            type: 'EPISODE_MANAGEMENT_ADMIN/EPISODE_LISTING/GET_ASSIGNEE_LIST',
            payload
        }
    },
    getStaffListByAgencyId: (payload) => {
        return {
            type: 'EPISODE_MANAGEMENT_ADMIN/EPISODE_LISTING/GET_STAFF_LIST',
            payload
        }
    },
    postCreateEpisode: (payload) => {
        return {
            type: 'EPISODE_MANAGEMENT_ADMIN/EPISODE_LISTING/POST_CREATE_EPISODE',
            payload
        }
    },
    getEmergencyVitals: (payload) => {
        return {
            type: 'EPISODE_MANAGEMENT_ADMIN/EPISODE_LISTING/GET_EMERGENCY_VITALS',
            payload
        }
    },
    getAllPayerList: (payload) => {
        return {
            type: 'EPISODE_MANAGEMENT_ADMIN/EPISODE_LISTING/GET_ALL_PAYER_LIST',
            payload
        }
    },
    getEpisodePurposeUsingRole: (payload) => {
        return {
            type: 'EPISODE_MANAGEMENT_ADMIN/EPISODE_LISTING/GET_EPISODE_PURPOSE',
            payload
        }
    }
}

function* getPatientDetailsByIdAsync(action) {
    try {
        yield put(setLoadingState({ state: PAGE_STATE.LOADING, message: 'Fetching Patient Details...' }))
        const { agencyId, patientId, token } = action.payload
        const response = yield EpisodeManagementService.getPatientDetailsById(agencyId, patientId, token)

        if (response.status === 200) {
            yield put(setPatientDetails(response.data))
            const res = General.transformMedicalOrderData(response.data.medicalOrder, MEDICALLY_NECESSARY_DISCIPLINES)
            yield put(setMedicalOrder(res))
        }
    } catch (error) {
        console.log('err: ', error)
    } finally {
        yield put(setLoadingState({ state: PAGE_STATE.PAGE_READY }))
    }
}

function* getAssigneeUsingRoleAsync(action) {
    try {
        yield put(setLoadingState({ state: PAGE_STATE.LOADING, message: 'Fetching Assignee List...' }))
        const { agencyId, role, token } = action.payload
        const response = yield EpisodeManagementService.getUserListByRole(agencyId, role, token)

        if (response.status === 200) {
            const filteredData = response.data.map(item => ({ ...item, label: `${item.firstName} ${item.lastName}`, value: item.id }))
            yield put(setUserListByProfessionalRole(filteredData))
        }
    } catch (error) {
        console.log('err: ', error)
    } finally {
        yield put(setLoadingState({ state: PAGE_STATE.PAGE_READY }))
    }
}

function* getStaffListByAgencyIdAsync(action) {
    try {
        yield put(setLoadingState({ state: PAGE_STATE.LOADING, message: 'Fetching Assignee List...' }))
        const { agencyId, token } = action.payload
        const response = yield EpisodeManagementService.getStaffListByAgencyId(agencyId, token)

        if (response.status === 200) {
            const filteredData = response.data.staff.map(item => ({ ...item, label: `${item.firstName} ${item.lastName}`, value: item.id }))
            yield put(setStaffList(filteredData))
        }
    } catch (error) {
        console.log('err: ', error)
    } finally {
        yield put(setLoadingState({ state: PAGE_STATE.PAGE_READY }))
    }
}

function* postCreateEpisodeAsync(action) {
    try {
        yield put(setLoadingState({ state: PAGE_STATE.LOADING, message: 'Fetching Assignee List...' }))
        const { agencyId, patientId, data, token } = action.payload
        const response = yield EpisodeManagementService.postCreateEpisode(agencyId, patientId, data, token)

        if (response.status === 201) {
            toast.success("Episode created successfully!")
            yield put(setNavigateToEpisodePage(true))
        }
    } catch (error) {
        console.log('err: ', error)
    } finally {
        yield put(setLoadingState({ state: PAGE_STATE.PAGE_READY }))
    }
}

function* getEmergencyVitalsAsync(action) {
    try {
        yield put(setLoadingState({ state: PAGE_STATE.LOADING, message: 'Fetching Vital Details...' }))
        const { agencyId, token } = action.payload
        const response = yield EpisodeManagementService.getEmergencyVitals(agencyId, token)

        if (response.status === 200) {
            yield put(setEmergencyVitals(response.data))
        }
    } catch (error) {
        console.log('err: ', error)
    } finally {
        yield put(setLoadingState({ state: PAGE_STATE.PAGE_READY }))
    }
}

function* getAllPayerListAsync(action) {
    try {
        yield put(setLoadingState({ state: PAGE_STATE.LOADING, message: 'Fetching Vital Details...' }))
        const { patientId, token } = action.payload
        const response = yield EpisodeManagementService.getAllPayerList(patientId, token)

        if (response.status === 200) {
            const filteredData = response.data.map(item => ({ ...item, label: `${item.payerName}`, value: `${item.payerName}` }))
            yield put(setPayerList(filteredData))
        }
    } catch (error) {
        console.log('err: ', error)
    } finally {
        yield put(setLoadingState({ state: PAGE_STATE.PAGE_READY }))
    }
}

function* getEpisodePurposeUsingRoleAsync(action){
    try {
        yield put(setLoadingState({ state: PAGE_STATE.LOADING, message: 'Fetching Episode Purpose List...' }))
        const { discipline } = action.payload
        const response = yield EpisodeManagementService.getEpisodePurposeUsingRole(discipline.code)
        if (response.status === 200) {
            const filteredData = response.data.map(item => ({ ...item, label: item.purpose, value: item.formId }))
            yield put(setEpisodePurposeList(filteredData))
        }
    } catch (error) {
        console.log('err: ', error)
    } finally {
        yield put(setLoadingState({ state: PAGE_STATE.PAGE_READY }))
    }
}

function* rootSaga() {
    yield all([
        takeLatest(getPatientDetailsById().type, getPatientDetailsByIdAsync),
        takeLatest(getAssigneeUsingRole().type, getAssigneeUsingRoleAsync),
        takeLatest(getStaffListByAgencyId().type, getStaffListByAgencyIdAsync),
        takeLatest(postCreateEpisode().type, postCreateEpisodeAsync),
        takeLatest(getEmergencyVitals().type, getEmergencyVitalsAsync),
        takeLatest(getAllPayerList().type, getAllPayerListAsync),
        takeLatest(getEpisodePurposeUsingRole().type, getEpisodePurposeUsingRoleAsync)
    ])
}

store.sagaManager.addSaga(componentKey, rootSaga)