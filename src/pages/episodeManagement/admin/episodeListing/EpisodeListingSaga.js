import store from '../../../../store/store'
import { all, put, takeLatest } from 'redux-saga/effects'
import EpisodeManagementService from '../../../../services/EpisodeManagementService'
import { setLoadingState } from '../EpisodeManagementSlice'
import { PAGE_STATE } from '../../../../libs/constant'
import { componentKey, setAllPatientList, setEpisodeList, setEpisodePaginationState, setPaginationState, setShowDeleteEpisodeModal } from './EpisodeListingSlice'
import { toast } from 'react-toastify'

export const { getAllPatientList, getEpisodeListByAgencyId, deleteEpisode } = {
    getAllPatientList: (payload) => {
        return {
            type: 'EPISODE_MANAGEMENT_ADMIN/EPISODE_LISTING/GET_ALL_PATIENT_LIST',
            payload
        }
    },
    getEpisodeListByAgencyId: (payload) => {
        return {
            type: 'EPISODE_MANAGEMENT_ADMIN/EPISODE_LISTING/GET_ALL_EPISODe_LIST',
            payload
        }
    },
    deleteEpisode: (payload) => {
        return {
            type: 'EPISODE_MANAGEMENT_ADMIN/EPISODE_LISTING/DELETE_EPISODE',
            payload
        }
    }
}

function* getAllPatientListAsync(action) {
    try {
        yield put(setLoadingState({ state: PAGE_STATE.LOADING, message: 'Fetching Patient List...' }))
        const { agencyId, pageNumber, limit, status, searchKey, token } = action.payload
        const response = yield EpisodeManagementService.getAllPatientList(agencyId, pageNumber, limit, status, searchKey, token)

        if (response.status === 200) {
            yield put(setAllPatientList(response.data.patients))
            yield put(setPaginationState({ totalPatients: response.data.totalRecords }))
        }
    } catch (error) {
        console.log('err: ', error)
    } finally {
        yield put(setLoadingState({ state: PAGE_STATE.PAGE_READY }))
    }
}

function* getEpisodeListByAgencyIdAsync(action) {
    try {
        yield put(setLoadingState({ state: PAGE_STATE.LOADING, message: 'Fetching Patient List...' }))
        const { agencyId, pageNumber, limit, token, status, searchKey } = action.payload
        const response = yield EpisodeManagementService.getEpisodeListByAgencyId(agencyId, pageNumber, limit, token, status, searchKey)

        if (response.status === 200) {
            yield put(setEpisodeList(response.data.episodes))
            yield put(setEpisodePaginationState({ totalPatients: response.data.totalRecords }))
        }
    } catch (error) {
        console.log('err: ', error)
    } finally {
        yield put(setLoadingState({ state: PAGE_STATE.PAGE_READY }))
    }
}

function* deleteEpisodeAsync(action) {
    try {
        yield put(setLoadingState({ state: PAGE_STATE.LOADING, message: 'Fetching Patient List...' }))
        const { agencyId, episodeId, token, EpisodePaginationState } = action.payload
        const response = yield EpisodeManagementService.deleteEpisode(agencyId, episodeId, token)

        if (response.status === 200) {
            toast.success("Episode deleted successfully!")
            yield put(getEpisodeListByAgencyId({ agencyId, pageNumber: EpisodePaginationState.PageNumber, limit: EpisodePaginationState.PageSize, token, status: EpisodePaginationState.Status.value, searchKey: EpisodePaginationState.FilterText }))
        }
    } catch (error) {
        console.log('err: ', error)
    } finally {
        yield put(setLoadingState({ state: PAGE_STATE.PAGE_READY }))
        yield put(setShowDeleteEpisodeModal(false))
    }
}


function* rootSaga() {
    yield all([
        takeLatest(getAllPatientList().type, getAllPatientListAsync),
        takeLatest(getEpisodeListByAgencyId().type, getEpisodeListByAgencyIdAsync),
        takeLatest(deleteEpisode().type, deleteEpisodeAsync),
    ])
}

store.sagaManager.addSaga(componentKey, rootSaga)