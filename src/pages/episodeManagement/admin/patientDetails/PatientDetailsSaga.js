import store from '../../../../store/store'
import { all, put, takeLatest } from 'redux-saga/effects'
import EpisodeManagementService from '../../../../services/EpisodeManagementService'
import { PAGE_STATE } from '../../../../libs/constant'
import { setLoadingState } from '../EpisodeManagementSlice'
import { componentKey, setPatientDetails, setPatientEpisodeList } from './PatientDetailsSlice'

export const { getPatientDetailsById } = {
    getPatientDetailsById: (payload) => {
        return {
            type: 'EPISODE_MANAGEMENT_ADMIN/EPISODE_LISTING/GET_PATIENT_DETAILS_BY_ID',
            payload
        }
    },
}

function* getPatientDetailsByIdAsync(action) {
    try {
        yield put(setLoadingState({ state: PAGE_STATE.LOADING, message: 'Fetching Patient Details...' }))
        const { agencyId, patientId, token } = action.payload
        const response = yield EpisodeManagementService.getPatientDetailsById(agencyId, patientId, token)

        if (response.status === 200) {
            yield put(setPatientDetails(response.data))
            yield put(setPatientEpisodeList(response?.data?.Episode))
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
    ])
}

store.sagaManager.addSaga(componentKey, rootSaga)