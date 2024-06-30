import store from '../../../../store/store'
import { all, put, takeLatest } from 'redux-saga/effects'
import { PAGE_STATE } from '../../../../libs/constant'
import { componentKey, setClientEpisodeList, setPaginationState } from './ClientEpisodeListingSlice'
import { setLoadingState } from '../ClientEpisodeSlice'

import ClientEpisodeService from '../../../../services/ClientEpisodeService'

export const { getClientEpisodeList } = {
    getClientEpisodeList: (payload) => {
        return {
            type: 'CLIENT_EPISODE_MANAGEMENT_ADMIN/EPISODE_LISTING/EPISODE_LIST',
            payload
        }
    }
}

function* getClientEpisodeListAsync(action) {
    try {
        yield put(setLoadingState({ state: PAGE_STATE.LOADING, message: 'Fetching Episode List...' }))
        const { agencyId, userId, type, status, searchKey, pageNumber, limit, token } = action.payload
        const response = yield ClientEpisodeService.getClientEpisodeList(agencyId, userId, type, status, searchKey, pageNumber, limit, token)

        if (response.status === 200) {
            yield put(setClientEpisodeList(response.data.episodes))
            yield put(setPaginationState({ totalEpisode: response.data.totalRecords }))
        }
    } catch (error) {
        console.log('err: ', error)
    } finally {
        yield put(setLoadingState({ state: PAGE_STATE.PAGE_READY }))
    }
}

function* rootSaga() {
    yield all([
        takeLatest(getClientEpisodeList().type, getClientEpisodeListAsync),
    ])
}

store.sagaManager.addSaga(componentKey, rootSaga)